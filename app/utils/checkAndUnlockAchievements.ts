// utils/checkAndUnlockAchievements.ts
import prisma from "../backend/lib/prisma";

export async function checkAndUnlockAchievements(userId: string) {
  const progress = await prisma.userProgress.findUnique({ where: { userId } });
  const cravings = await prisma.cravingEvent.findMany({ where: { userId } });

  const totalCravings = cravings.length;
  const resolvedCravings = cravings.filter(c => c.resolved).length;
  const xp = progress?.xp || 0;

  const alreadyUnlocked = await prisma.userAchievement.findMany({
    where: { userId },
    select: { achievementId: true },
  });
  const unlockedIds = new Set(alreadyUnlocked.map(a => a.achievementId));

  const allAchievements = await prisma.achievement.findMany();

  for (const a of allAchievements) {
    if (unlockedIds.has(a.id)) continue;

    let qualifies = false;

    switch (a.type) {
      case 'XP':
        qualifies = xp >= a.value;
        break;
      case 'CRAVING':
        qualifies = totalCravings >= a.value;
        break;
      case 'RESOLVED_CRAVING':
        qualifies = resolvedCravings >= a.value;
        break;
    }

    if (qualifies) {
      await prisma.userAchievement.create({
        data: {
          userId,
          achievementId: a.id,
        },
      });

      // Reward XP if needed
      if (a.xpReward > 0) {
        await prisma.userProgress.update({
          where: { userId },
          data: { xp: { increment: a.xpReward } },
        });
      }
    }
  }
}
