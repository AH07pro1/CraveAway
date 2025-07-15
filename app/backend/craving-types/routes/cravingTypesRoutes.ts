import express, { Request, Response } from 'express';
import prisma from '../../lib/prisma';
import { z } from 'zod';

const router = express.Router();

// Zod schema for craving type validation
const cravingTypeSchema = z.object({
  name: z.string().min(1).max(50),
  userId: z.string(),   
});

// Middleware to mock user authentication (replace with real auth)
function mockAuthMiddleware(req: Request, res: Response, next: any) {
  // This is just a demo. In real apps, decode token etc.
  req.user = { id: 'some-user-id' }; 
  next();
}

// Extend Express Request interface for `user`
declare global {
  namespace Express {
    interface Request {
      user?: { id: string };
    }
  }
}

// Protect all routes below with auth
router.use(mockAuthMiddleware);

// GET all craving types for user and built-in types
router.get("/", async (req: Request, res: Response) => {
  const userId = req.query.userId as string;
  if (!userId) return res.status(400).json({ error: "Missing userId" });

  try {
    const types = await prisma.cravingType.findMany({
      where: {
        OR: [
          { isCustom: false },          // built‑in
          { isCustom: true, userId },   // this user’s customs
        ],
      },
      orderBy: { name: "asc" },
    });
    res.json(types);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch craving types" });
  }
});

// -------- POST create custom type ----------
router.post("/", async (req: Request, res: Response) => {
  const result = cravingTypeSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error.format() });
  }
  const { name, userId } = result.data;

  try {
    const newType = await prisma.cravingType.create({
      data: {
        name,
        isCustom: true,
        userId,              // 👈 saved with owner
      },
    });
    res.status(201).json(newType);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create craving type" });
  }
});

// PUT update a custom craving type owned by user
router.put('/:id', async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });

  const result = cravingTypeSchema.safeParse(req.body);
  if (!result.success) return res.status(400).json({ errors: result.error.format() });

  try {
    // Only update if custom and owned by this user
    const existingType = await prisma.cravingType.findUnique({ where: { id } });
    if (!existingType) return res.status(404).json({ error: 'Type not found' });
    if (!existingType.isCustom || existingType.userId !== userId) {
      return res.status(403).json({ error: 'Not authorized to edit this type' });
    }

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

// DELETE custom craving type owned by user
router.delete('/:id', async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });

  try {
    const existingType = await prisma.cravingType.findUnique({ where: { id } });
    if (!existingType) return res.status(404).json({ error: 'Type not found' });
    if (!existingType.isCustom || existingType.userId !== userId) {
      return res.status(403).json({ error: 'Not authorized to delete this type' });
    }

    await prisma.cravingType.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete craving type' });
  }
});

export default router;
