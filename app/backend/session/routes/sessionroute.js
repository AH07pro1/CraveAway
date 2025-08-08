"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prisma_1 = __importDefault(require("../../lib/prisma"));
const zod_1 = require("zod");
const router = express_1.default.Router();
// --------------------
// Validation Schema
// --------------------
const sessionSchema = zod_1.z.object({
    userId: zod_1.z.string(),
    timeSpent: zod_1.z.number().min(1), // Must be at least 1 second
});
// --------------------
// XP & Level Formulas
// --------------------
const calculateXP = (seconds) => Math.floor(seconds / 10);
const calculateLevel = (xp) => Math.floor(Math.sqrt(xp / 10)) + 1;
// --------------------
// POST /api/session-complete
// --------------------
router.post('/', async (req, res) => {
    const result = sessionSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ errors: result.error.format() });
    }
    const { userId, timeSpent } = result.data;
    const xpGained = calculateXP(timeSpent);
    try {
        // Get or create user progress
        const existing = await prisma_1.default.userProgress.upsert({
            where: { userId },
            update: {
                xp: { increment: xpGained },
            },
            create: {
                userId,
                xp: xpGained,
                level: 1,
            },
        });
        const newXP = existing.xp + xpGained;
        const newLevel = calculateLevel(newXP);
        // Update level
        await prisma_1.default.userProgress.update({
            where: { userId },
            data: { level: newLevel },
        });
        // <-- Add this: check and unlock achievements
        return res.json({
            xpGained,
            totalXP: newXP,
            newLevel,
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to update XP/level' });
    }
});
// --------------------
// GET /api/session-complete/:userId
// Get XP and level for a user
// --------------------
router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;
    if (!userId) {
        return res.status(400).json({ error: "Missing userId" });
    }
    try {
        const progress = await prisma_1.default.userProgress.findUnique({
            where: { userId },
        });
        if (!progress) {
            return res.json({ xp: 0, level: 1 });
        }
        res.json({
            xp: progress.xp,
            level: progress.level,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch progress" });
    }
});
exports.default = router;
