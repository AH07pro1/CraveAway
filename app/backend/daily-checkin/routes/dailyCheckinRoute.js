"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prisma_1 = __importDefault(require("../../lib/prisma"));
const router = express_1.default.Router();
router.post('/', async (req, res) => {
    const { userId } = req.body;
    if (!userId)
        return res.status(400).json({ error: 'Missing userId' });
    const today = new Date();
    const dayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    try {
        const alreadyCheckedIn = await prisma_1.default.userDailyCheckin.findUnique({
            where: {
                userId_date: { userId, date: dayStart }
            },
        });
        if (alreadyCheckedIn) {
            return res.json({ message: 'Already checked in today', xpGained: 0 });
        }
        // Save today's check-in
        await prisma_1.default.userDailyCheckin.create({
            data: { userId, date: dayStart },
        });
        // Add XP
        await prisma_1.default.userProgress.upsert({
            where: { userId },
            update: { xp: { increment: 10 } },
            create: { userId, xp: 10, level: 1 },
        });
        const user = await prisma_1.default.userProgress.findUnique({ where: { userId } });
        const newLevel = Math.floor(Math.sqrt(user.xp / 10)) + 1;
        await prisma_1.default.userProgress.update({
            where: { userId },
            data: { level: newLevel },
        });
        return res.json({ message: 'Checked in, XP gained!', xpGained: 10, newLevel });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Daily check-in failed' });
    }
});
exports.default = router;
