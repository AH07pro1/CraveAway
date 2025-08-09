import express, { Request, Response } from 'express';
import prisma from '../../lib/prisma';
import { z } from 'zod';

const router = express.Router();

const onboardingSchema = z.object({
  userId: z.string().min(1),
  photoUrl: z.string().url().optional(),
  message: z.string().optional(),
});
router.post('/test', (req, res) => {
  console.log('POST /api/onboarding/test hit');
  res.json({ message: 'POST test route works!' });
});
// POST /api/user/onboarding
router.post('/', async (req: Request, res: Response) => {
   console.log('POST body received:', req.body);
  const result = onboardingSchema.safeParse(req.body);
  
  if (!result.success) {
    return res.status(400).json({ errors: result.error.format() });
  }

  const { userId, photoUrl, message } = result.data;

  try {
    await prisma.userProgress.upsert({
      where: { userId },
      update: {
        committed: true,
        ...(photoUrl !== undefined ? { photoUrl } : {}),
        ...(message !== undefined ? { message } : {}),
      },
      create: {
        userId,
        committed: true,
        ...(photoUrl !== undefined ? { photoUrl } : {}),
        ...(message !== undefined ? { message } : {}),
      },
    });

    res.status(200).json({ success: true });
  } catch (error) {
  console.error('Failed to save onboarding data:', error);
  res.status(500).json({
    error: 'Failed to save onboarding data',
    details: error instanceof Error ? error.message : JSON.stringify(error),
  });
}

}
);

// GET /api/user/onboarding?userId=xxx
router.get('/', async (req, res) => {
  const userId = req.query.userId as string;

  if (!userId) {
    return res.status(400).json({ error: 'userId query param is required' });
  }

  try {
    const progress = await prisma.userProgress.findUnique({
      where: { userId },
      select: {
        photoUrl: true,
        message: true,
      },
    });

    if (!progress) {
      return res.status(404).json({ error: 'No progress found' });
    }

    res.status(200).json({ success: true, data: progress });
  } catch (error) {
    console.error('Error fetching user progress:', error);
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
});

export default router;
