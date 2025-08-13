import express, { Request, Response } from 'express';
import prisma from '../../lib/prisma';
import { z } from 'zod';
import { Clerk } from '@clerk/clerk-sdk-node';


const router = express.Router();

const onboardingSchema = z.object({
  photoUrl: z.string().url().nullable().optional(),
  message: z.string().optional(),
});

// Initialize Clerk with your secret key from env variables
const clerk =  Clerk({ apiKey: process.env.CLERK_SECRET_KEY });

router.post('/test', (req, res) => {
  console.log('POST /api/onboarding/test hit');
  res.json({ message: 'POST test route works!' });
});

// POST /api/user/onboarding
router.post('/', async (req: Request, res: Response) => {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: Missing Bearer token' });
    }

    const token = authHeader.split(' ')[1];

    // Verify token with Clerk
    const session = await clerk.sessions.verifySession(token, process.env.CLERK_SECRET_KEY!);

    if (!session) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    // Extract verified userId from session
    const userId = session.userId;

    // Validate the body except userId since it's from the token
    const result = onboardingSchema.safeParse(req.body);

    if (!result.success) {
      console.warn('Validation errors:', result.error.format());
      return res.status(400).json({ errors: result.error.format() });
    }

    let { photoUrl, message } = result.data;

    if (!photoUrl || photoUrl.trim() === '') {
      photoUrl = null;
    }

    console.log('Upserting onboarding data for user:', userId);

    await prisma.userProgress.upsert({
      where: { userId },
      update: { photoUrl, message },
      create: { userId, photoUrl, message },
    });

    console.log('Upsert successful');
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Failed to save onboarding data:', error);
    res.status(500).json({
      error: 'Failed to save onboarding data',
      details: error instanceof Error ? error.message : JSON.stringify(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
  }
});

// GET /api/user/onboarding?userId=xxx
router.get('/', async (req, res) => {
  const userId = req.query.userId as string;

  if (!userId) {
    return res.status(400).json({ error: 'userId query param is required' });
  }

  try {
    console.log('Fetching onboarding data for user:', userId);
    const progress = await prisma.userProgress.findUnique({
      where: { userId },
      select: {
        photoUrl: true,
        message: true,
      },
    });

    if (!progress) {
      console.warn('No onboarding progress found for user:', userId);
      return res.status(404).json({ error: 'No progress found' });
    }

    res.status(200).json({ success: true, data: progress });
  } catch (error) {
    console.error('Error fetching user progress:', error);
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
});

export default router;
