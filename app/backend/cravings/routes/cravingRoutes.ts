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

});

// GET all cravings
router.get('/', async (_req: Request, res: Response) => {
  try {
    const cravings = await prisma.cravingEvent.findMany({
  include: {
    type: {
      select: {
        name: true,
      },
    },
  },
});
res.json(cravings);

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

  const { intensity, notes, resolved, type } = result.data;

  try {
    // Step 1: Ensure the craving type exists or create it
    const cravingType = await prisma.cravingType.upsert({
      where: { name: type },
      update: {}, // no fields to update
      create: { name: type, isCustom: false }, // add 'isCustom' field if it exists
    });

    // Step 2: Create the craving and connect to the craving type
    const newCraving = await prisma.cravingEvent.create({
      data: {
        intensity,
        notes,
        resolved,
        type: {
          connect: { id: cravingType.id },
        },
      },
      include: {
        type: true, // so frontend gets the name back too
      },
    });

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
