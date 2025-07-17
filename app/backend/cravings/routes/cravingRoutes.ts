import express, { Request, Response } from 'express';
import prisma from '../../lib/prisma'; 
import { z } from 'zod';

const router = express.Router();

// Zod schema for validation
const cravingSchema = z.object({
  intensity: z.number().min(1).max(10).optional(),
  notes: z.string().optional(),
  resolved: z.boolean(),
  type: z.string({
  required_error: "Type is required",
  invalid_type_error: "Type must be a string",
}),
userId: z.string()
});

// GET all cravings
router.get('/', async (req: Request, res: Response) => {
  const userId = req.query.userId as string;
  if (!userId) return res.status(400).json({ error: "Missing userId" });

  try {
    const cravings = await prisma.cravingEvent.findMany({
      where: { userId },
      include: {
        type: { select: { name: true } },
      },
    });
    res.json(cravings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch cravings' });
  }
});


// POST create a new craving
// POST create a new craving
router.post('/', async (req: Request, res: Response): Promise<any> => {
  const result = cravingSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error.format() });
  }

  const { intensity, notes, resolved, type, userId } = result.data;

  try {
    const cravingType = await prisma.cravingType.upsert({
      where:  { name: type },
      update: {},
      create: { name: type, isCustom: false },
    });

    const newCraving = await prisma.cravingEvent.create({
      data: {
        intensity,
        notes,
        resolved,
        userId,
        type: { connect: { id: cravingType.id } },
      },
      include: { type: true },
    });

    // Base XP gained for creating craving
    let xpGained = 5;

    await prisma.userProgress.upsert({
      where: { userId },
      update: { xp: { increment: 5 } },
      create: { userId, xp: 5, level: 1 },
    });

    const userProgress = await prisma.userProgress.findUnique({ where: { userId } });
    const newLevel = Math.floor(Math.sqrt(userProgress!.xp / 10)) + 1;

    await prisma.userProgress.update({
      where: { userId },
      data: { level: newLevel },
    });

    if (resolved) {
      xpGained += 10;

      await prisma.userProgress.upsert({
        where: { userId },
        update: { xp: { increment: 10 } },
        create: { userId, xp: 10, level: 1 },
      });

      const updatedUser = await prisma.userProgress.findUnique({ where: { userId } });
      const updatedLevel = Math.floor(Math.sqrt(updatedUser!.xp / 10)) + 1;

      await prisma.userProgress.update({
        where: { userId },
        data: { level: updatedLevel },
      });
    }

    // Send back the craving and xpGained
    res.status(201).json({ ...newCraving, xpGained });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create craving' });
  }
});


// GET craving by id
router.get('/:id', async (req: Request, res: Response): Promise<any> => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  try {
    const craving = await prisma.cravingEvent.findUnique({
      where: { id },
      include: {
        type: true, // Include type relation
      },
    });

    if (!craving) {
      return res.status(404).json({ error: 'Craving not found' });
    }

    res.json(craving);
  } catch (error) {
    console.error("Error in GET /:id", error);
    res.status(500).json({ error: 'Failed to fetch craving' });
  }
});



export default router;
