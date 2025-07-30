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
  userId: z.string(),
});

// ✅ GET all cravings for a user
router.get('/', async (req: Request, res: Response) => {
  const userId = req.query.userId as string;
  if (!userId) return res.status(400).json({ error: "Missing userId" });

  try {
    const cravings = await prisma.cravingEvent.findMany({
      where: { userId },
      include: {
        type: { select: { name: true, isCustom: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json(cravings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch cravings' });
  }
});

// ✅ GET all craving types (custom + default)
router.get('/types', async (req: Request, res: Response) => {
  const userId = req.query.userId as string;
  if (!userId) return res.status(400).json({ error: "Missing userId" });

  try {
    const cravingTypes = await prisma.cravingType.findMany({
      where: {
        OR: [
          { isCustom: false },
          { isCustom: true, userId },
        ],
      },
      orderBy: { name: 'asc' },
    });

    res.json(cravingTypes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch craving types' });
  }
});

// ✅ POST create a new craving
router.post('/', async (req: Request, res: Response) => {
  const result = cravingSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error.format() });
  }

  const { intensity, notes, resolved, type, userId } = result.data;

  try {
    // ✅ Look for existing type (default or custom)
    let cravingType = await prisma.cravingType.findFirst({
      where: {
        name: type,
        OR: [
          { isCustom: false },
          { isCustom: true, userId },
        ],
      },
    });

    // ✅ If not found, create a custom one for this user
    if (!cravingType) {
      cravingType = await prisma.cravingType.create({
        data: {
          name: type,
          isCustom: true,
          userId,
        },
      });
    }

    // ✅ Create the craving event
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

    // ✅ XP handling
    let xpGained = 5;
    await prisma.userProgress.upsert({
      where: { userId },
      update: { xp: { increment: 5 } },
      create: { userId, xp: 5, level: 1 },
    });

    const progress = await prisma.userProgress.findUnique({ where: { userId } });
    const level = Math.floor(Math.sqrt(progress!.xp / 10)) + 1;

    await prisma.userProgress.update({
      where: { userId },
      data: { level },
    });

    // ✅ Bonus XP if resolved
    if (resolved) {
      xpGained += 10;

      await prisma.userProgress.update({
        where: { userId },
        data: { xp: { increment: 10 } },
      });

      const updated = await prisma.userProgress.findUnique({ where: { userId } });
      const updatedLevel = Math.floor(Math.sqrt(updated!.xp / 10)) + 1;

      await prisma.userProgress.update({
        where: { userId },
        data: { level: updatedLevel },
      });
    }

    res.status(201).json({ ...newCraving, xpGained });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create craving' });
  }
});

// ✅ GET craving by ID
router.get('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });

  try {
    const craving = await prisma.cravingEvent.findUnique({
      where: { id },
      include: { type: true },
    });

    if (!craving) return res.status(404).json({ error: 'Craving not found' });

    res.json(craving);
  } catch (error) {
    console.error("Error in GET /:id", error);
    res.status(500).json({ error: 'Failed to fetch craving' });
  }
});

export default router;
