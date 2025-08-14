import express, { Request, Response } from 'express';
import prisma from '../../lib/prisma';
import { z } from 'zod';
import { verifyToken } from '@clerk/clerk-sdk-node';

const router = express.Router();

// Schema for onboarding
const onboardingSchema = z.object({
  photoUrl: z.string().url().nullable().optional(),
  message: z.string().optional(),
});

// Test route
router.post('/test', (req, res) => {
  console.log('POST /api/onboarding/test hit');
  res.json({ message: 'POST test route works!' });
});

// POST /api/user/onboarding
router.post('/', async (req: Request, res: Response) => {
  try {
    // Validate body
    const result = onboardingSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ errors: result.error.format() });
    }
    const { photoUrl: rawPhotoUrl, message } = result.data;

    // Get session token from header
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Missing session token' });

    // Networkless verification
    const verifiedToken = await verifyToken(token, {
      jwtKey: process.env.CLERK_SECRET_KEY,
      authorizedParties: ['http://localhost:3000', 'api.twins4soft.com'], // Replace with your authorized parties
      issuer: 'live-whale-13.clerk.accounts.dev', // Replace with your Clerk instance URL
    });

    if (!verifiedToken) {
      return res.status(401).json({ error: 'Invalid or expired session token' });
    }

    const userId = verifiedToken.sub;
    const photoUrl = rawPhotoUrl?.trim() === '' ? null : rawPhotoUrl;

    // Upsert onboarding data
    await prisma.userProgress.upsert({
      where: { userId },
      update: { photoUrl, message },
      create: { userId, photoUrl, message },
    });

    console.log('✅ Onboarding upsert successful for user:', userId);
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
  if (!userId) return res.status(400).json({ error: 'userId query param is required' });

  try {
    console.log('Fetching onboarding data for user:', userId);
    const progress = await prisma.userProgress.findUnique({
      where: { userId },
      select: { photoUrl: true, message: true },
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
