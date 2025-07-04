import express, { Request, Response } from 'express';
import prisma from '../../lib/prisma'; 
import { z } from 'zod';

const router = express.Router();

// Zod schema for validation
const cravingSchema = z.object({
  intensity: z.number().min(1).max(10).optional(),
  notes: z.string().optional(),
  resolved: z.boolean(),
  type: z.enum([
    'food',
    'smoke',
    'drink',
    'cigarette',
    'vape',
    'weed',
    'cocaine',
    'heroin',
    'other',
  ]),
});

// GET all cravings
router.get('/', async (_req: Request, res: Response) => {
  try {
    const cravings = await prisma.cravingEvent.findMany();
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

  try {
    const newCraving = await prisma.cravingEvent.create({
      data: result.data,
    });
    res.status(201).json(newCraving);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create craving' });
  }
});

// (Optional) Add more routes (GET by id, DELETE, etc.) if needed here...

export default router;
