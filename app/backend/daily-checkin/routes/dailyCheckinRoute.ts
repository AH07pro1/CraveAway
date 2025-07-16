import express, { Request, Response } from 'express';
import prisma from '../../lib/prisma';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ error: 'Missing userId' });

  const today = new Date();
  const dayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  try {
    const alreadyCheckedIn = await prisma.userDailyCheckin.findUnique({
      where: {
        userId_date: { userId, date: dayStart }
      },
    });

    if (alreadyCheckedIn) {
      return res.json({ message: 'Already checked in today', xpGained: 0 });
    }

    // Save today's check-in
    await prisma.userDailyCheckin.create({
      data: { userId, date: dayStart },
    });

    // Add XP
    await prisma.userProgress.upsert({
      where: { userId },
      update: { xp: { increment: 10 } },
      create: { userId, xp: 10, level: 1 },
    });

    const user = await prisma.userProgress.findUnique({ where: { userId } });
    const newLevel = Math.floor(Math.sqrt(user!.xp / 10)) + 1;

    await prisma.userProgress.update({
      where: { userId },
      data: { level: newLevel },
    });

    return res.json({ message: 'Checked in, XP gained!', xpGained: 10, newLevel });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Daily check-in failed' });
  }
});

export default router;
