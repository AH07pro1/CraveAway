import express from 'express';
import prisma from '../../lib/prisma';
import { subDays, format, isSameDay, differenceInMinutes } from 'date-fns';

const router = express.Router();

// Helper: Calculate current consecutive streak based on dailyCheckins array
function calculateCurrentStreak(checkins: { date: Date }[]) {
  if (checkins.length === 0) return 0;

  let streak = 0;
  let cursor = new Date();

  for (let i = 0; i < checkins.length; i++) {
    const checkinDate = new Date(checkins[i].date);

    if (isSameDay(cursor, checkinDate)) {
      streak++;
      cursor = subDays(cursor, 1);
    } else if (checkinDate < cursor) {
      // Break if a day is missing in streak
      break;
    }
  }

  return streak;
}

// Helper: Count max cravings resolved in one day (DAILY_RESOLVED_CRAVINGS)
async function calculateMaxDailyResolvedCravings(userId: string) {
  const cravings = await prisma.cravingEvent.findMany({
    where: { userId, resolved: true },
    select: { resolvedAt: true },
  });

  if (cravings.length === 0) return 0;

  // Group resolved cravings by day string
  const countsByDay: Record<string, number> = {};

  cravings.forEach(c => {
    if (!c.resolvedAt) return; // skip if no resolvedAt timestamp
    const dayStr = format(c.resolvedAt, 'yyyy-MM-dd');

    countsByDay[dayStr] = (countsByDay[dayStr] || 0) + 1;
  });

  return Math.max(...Object.values(countsByDay));
}

// Helper: Count days with zero cravings (NO_CRAVINGS_DAY)
async function calculateNoCravingsDays(userId: string) {
  // Get all distinct dates user has checked in (app usage days)
  const dailyCheckins = await prisma.userDailyCheckin.findMany({
    where: { userId },
    select: { date: true },
  });

  let noCravingDayCount = 0;

  for (const checkin of dailyCheckins) {
    const dayStart = new Date(checkin.date);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(checkin.date);
    dayEnd.setHours(23, 59, 59, 999);

    const cravingsCount = await prisma.cravingEvent.count({
      where: {
        userId,
        createdAt: {
          gte: dayStart,
          lte: dayEnd,
        },
      },
    });

    if (cravingsCount === 0) {
      noCravingDayCount++;
    }
  }

  return noCravingDayCount;
}

// Helper: Count cravings resolved quickly (within 5 minutes) for FAST_RESOLUTION
async function calculateFastResolvedCravings(userId: string, maxMinutes = 5) {
  const cravings = await prisma.cravingEvent.findMany({
    where: {
      userId,
      resolved: true,
      resolvedAt: { not: null },
      createdAt: { not: undefined },
    },
    select: {
      createdAt: true,
      resolvedAt: true,
    },
  });

  let count = 0;

  cravings.forEach(c => {
    if (c.resolvedAt && c.createdAt) {
      const diff = differenceInMinutes(c.resolvedAt, c.createdAt);
      if (diff <= maxMinutes) count++;
    }
  });

  return count;
}

router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;

  if (!userId) {
    return res.status(400).json({ error: 'Missing userId' });
  }

  try {
    // Fetch base user data
    const userProgress = await prisma.userProgress.findUnique({ where: { userId } });
    const cravings = await prisma.cravingEvent.findMany({ where: { userId } });
    const userAchievements = await prisma.userAchievement.findMany({ where: { userId } });
    const dailyCheckins = await prisma.userDailyCheckin.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
    });
    const achievements = await prisma.achievement.findMany();

    const unlockedIds = new Set(userAchievements.map(a => a.achievementId));
    const totalCravings = cravings.length;
    const resolvedCravings = cravings.filter(c => c.resolved).length;
    const xp = userProgress?.xp || 0;

    // Calculate advanced stats:
    const streak = calculateCurrentStreak(dailyCheckins);
    const daysActive = dailyCheckins.length;
    const noCravingsDays = await calculateNoCravingsDays(userId);
    const fastResolvedCount = await calculateFastResolvedCravings(userId);
    const maxDailyResolved = await calculateMaxDailyResolvedCravings(userId);

    // Compose achievements with progress
    const achievementsWithProgress = achievements.map(a => {
      let currentValue = 0;

      switch (a.type) {
        case 'XP':
          currentValue = xp;
          break;
        case 'CRAVING':
          currentValue = totalCravings;
          break;
        case 'RESOLVED_CRAVING':
          currentValue = resolvedCravings;
          break;
        case 'STREAK':
          currentValue = streak;
          break;
        case 'DAYS_ACTIVE':
          currentValue = daysActive;
          break;
        case 'NO_CRAVINGS_DAY':
          currentValue = noCravingsDays;
          break;
        case 'FAST_RESOLUTION':
          currentValue = fastResolvedCount;
          break;
        case 'DAILY_RESOLVED_CRAVINGS':
          currentValue = maxDailyResolved;
          break;
        default:
          currentValue = 0;
      }

      return {
        id: a.id,
        title: a.title,
        description: a.description,
        xpReward: a.xpReward,
        value: a.value,
        type: a.type,
        currentValue,
        unlocked: unlockedIds.has(a.id),
      };
    });

    return res.json(achievementsWithProgress);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch achievements' });
  }
});

export default router;
