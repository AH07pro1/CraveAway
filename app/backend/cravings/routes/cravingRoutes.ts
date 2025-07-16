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
router.post('/', async (req: Request, res: Response): Promise<any> => {
  const result = cravingSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error.format() });
  }

  // ⬅️  Grab userId too
  const { intensity, notes, resolved, type, userId } = result.data;

  try {
    // 1. Make sure the craving type exists
    const cravingType = await prisma.cravingType.upsert({
      where:  { name: type },
      update: {},
      create: { name: type, isCustom: false },
    });

    // 2. Create the craving linked to this user
    const newCraving = await prisma.cravingEvent.create({
      data: {
        intensity,
        notes,
        resolved,
        userId,                    // ✅ now TypeScript knows what this is
        type: { connect: { id: cravingType.id } },
      },
      include: { type: true },
    });

    await prisma.userProgress.upsert({
  where: { userId },
  update: { xp: { increment: 5 } },
  create: { userId, xp: 5, level: 1 },
});

const user = await prisma.userProgress.findUnique({ where: { userId } });
const newLevel = Math.floor(Math.sqrt(user!.xp / 10)) + 1;

await prisma.userProgress.update({
  where: { userId },
  data: { level: newLevel },
});

if (resolved) {
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
}

    res.status(201).json(newCraving);
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
