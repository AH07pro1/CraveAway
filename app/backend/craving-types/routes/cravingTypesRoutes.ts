import express, { Request, Response } from 'express';
import prisma from '../../lib/prisma';
import { z } from 'zod';

const router = express.Router();

// Zod schema for craving type validation
const cravingTypeSchema = z.object({
  name: z.string().min(1).max(50), // adjust validation as needed
});

// GET all craving types
router.get('/', async (_req: Request, res: Response) => {
  try {
    const types = await prisma.cravingType.findMany();
    res.json(types);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch craving types' });
  }
});

// POST create a new craving type
router.post('/', async (req: Request, res: Response) => {
  const result = cravingTypeSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error.format() });
  }

  try {
    const newType = await prisma.cravingType.create({
      data: {
        name: result.data.name,
      },
    });
    res.status(201).json(newType);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create craving type' });
  }
});

// GET craving type by id
router.get('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  try {
    const type = await prisma.cravingType.findUnique({
      where: { id },
    });

    if (!type) {
      return res.status(404).json({ error: 'Craving type not found' });
    }

    res.json(type);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch craving type' });
  }
});

// PUT update craving type by id
router.put('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  const result = cravingTypeSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error.format() });
  }

  try {
    const updatedType = await prisma.cravingType.update({
      where: { id },
      data: { name: result.data.name },
    });
    res.json(updatedType);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update craving type' });
  }
});

// DELETE craving type by id
router.delete('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  try {
    await prisma.cravingType.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete craving type' });
  }
});

export default router;
