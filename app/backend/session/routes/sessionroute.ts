import express, { Request, Response } from 'express';
import prisma from '../../lib/prisma';
import { z } from 'zod';





const router = express.Router();

// --------------------
// Validation Schema
// --------------------
const sessionSchema = z.object({
  userId: z.string(),
  timeSpent: z.number().min(1), // Must be at least 1 second
});

// --------------------
// XP & Level Formulas
// --------------------
const calculateXP = (seconds: number) => Math.floor(seconds / 10);
const calculateLevel = (xp: number) => Math.floor(Math.sqrt(xp / 10)) + 1;

// --------------------
// POST /api/session-complete
// --------------------
router.post('/', async (req: Request, res: Response) => {
  const result = sessionSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ errors: result.error.format() });
  }

  const { userId, timeSpent } = result.data;
  const xpGained = calculateXP(timeSpent);

  try {
    // Get or create user progress
    const existing = await prisma.userProgress.upsert({
      where: { userId },
      update: {
        xp: { increment: xpGained },
      },
      create: {
        userId,
        xp: xpGained,
        level: 1,
      },
    });

    const newXP = existing.xp + xpGained;
    const newLevel = calculateLevel(newXP);

    // Update level
    await prisma.userProgress.update({
      where: { userId },
      data: { level: newLevel },
    });

    // <-- Add this: check and unlock achievements


    return res.json({
      xpGained,
      totalXP: newXP,
      newLevel,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to update XP/level' });
  }
});


// --------------------
// GET /api/session-complete/:userId
// Get XP and level for a user
// --------------------
router.get('/:userId', async (req: Request, res: Response) => {
  const userId = req.params.userId;

  if (!userId) {
    return res.status(400).json({ error: "Missing userId" });
  }

  try {
    const progress = await prisma.userProgress.findUnique({
      where: { userId },
    });

    if (!progress) {
      return res.json({ xp: 0, level: 1 });
    }

    res.json({
      xp: progress.xp,
      level: progress.level,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch progress" });
  }
});

export default router;
