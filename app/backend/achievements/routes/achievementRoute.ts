// backend/routes/achievements.ts (example)
import express from 'express';
import prisma from '../../lib/prisma';

const router = express.Router();

router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;

  if (!userId) {
    return res.status(400).json({ error: 'Missing userId' });
  }

  try {
    const achievements = await prisma.achievement.findMany();
    const userProgress = await prisma.userProgress.findUnique({ where: { userId } });
    const cravings = await prisma.cravingEvent.findMany({ where: { userId } });
    const userAchievements = await prisma.userAchievement.findMany({ where: { userId } });

    const unlockedIds = new Set(userAchievements.map(a => a.achievementId));
    const totalCravings = cravings.length;
    const resolvedCravings = cravings.filter(c => c.resolved).length;
    const xp = userProgress?.xp || 0;

    const achievementsWithProgress = achievements.map(a => {
      let currentValue = 0;
      if (a.type === 'XP') currentValue = xp;
      else if (a.type === 'CRAVING') currentValue = totalCravings;
      else if (a.type === 'RESOLVED_CRAVING') currentValue = resolvedCravings;

      return {
        id: a.id,
        title: a.title,
        description: a.description,
        xpReward: a.xpReward,
        value: a.value, // goal value
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
