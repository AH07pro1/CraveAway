"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prisma_1 = __importDefault(require("../../lib/prisma"));
const zod_1 = require("zod");
const router = express_1.default.Router();
const onboardingSchema = zod_1.z.object({
    userId: zod_1.z.string().min(1),
    photoUrl: zod_1.z.string().url().optional(),
    message: zod_1.z.string().optional(),
});
router.post('/test', (req, res) => {
    console.log('POST /api/onboarding/test hit');
    res.json({ message: 'POST test route works!' });
});
// POST /api/user/onboarding
router.post('/', async (req, res) => {
    const result = onboardingSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ errors: result.error.format() });
    }
    const { userId, photoUrl, message } = result.data;
    try {
        await prisma_1.default.userProgress.upsert({
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
    }
    catch (error) {
        console.error('Failed to save onboarding data', error);
        res.status(500).json({ error: 'Failed to save onboarding data' });
    }
});
// GET /api/user/onboarding/:userId
router.get('/', async (req, res) => {
    const userId = req.query.userId;
    if (!userId) {
        return res.status(400).json({ error: 'userId query param is required' });
    }
    try {
        const progress = await prisma_1.default.userProgress.findUnique({ where: { userId } });
        if (!progress) {
            return res.status(404).json({ error: 'No progress found' });
        }
        res.status(200).json({ success: true, data: progress });
    }
    catch (error) {
        console.error('Error fetching user progress:', error);
        res.status(500).json({ error: 'Failed to fetch progress' });
    }
});
exports.default = router;
