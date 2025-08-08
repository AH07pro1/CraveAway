"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prisma_1 = __importDefault(require("../../lib/prisma"));
const zod_1 = require("zod");
const router = express_1.default.Router();
// Zod schema for validation
const cravingSchema = zod_1.z.object({
    intensity: zod_1.z.number().min(1).max(10).optional(),
    notes: zod_1.z.string().optional(),
    resolved: zod_1.z.boolean(),
    type: zod_1.z.string({
        required_error: "Type is required",
        invalid_type_error: "Type must be a string",
    }),
    userId: zod_1.z.string(),
});
// ✅ GET all cravings for a user
router.get('/', async (req, res) => {
    const userId = req.query.userId;
    if (!userId)
        return res.status(400).json({ error: "Missing userId" });
    try {
        const cravings = await prisma_1.default.cravingEvent.findMany({
            where: { userId },
            include: {
                type: { select: { name: true, isCustom: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
        res.json(cravings);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch cravings' });
    }
});
// ✅ GET all craving types (custom + default)
router.get('/types', async (req, res) => {
    const userId = req.query.userId;
    if (!userId)
        return res.status(400).json({ error: "Missing userId" });
    try {
        const cravingTypes = await prisma_1.default.cravingType.findMany({
            where: {
                OR: [
                    { isCustom: false },
                    { isCustom: true, userId },
                ],
            },
            orderBy: { name: 'asc' },
        });
        res.json(cravingTypes);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch craving types' });
    }
});
// ✅ POST create a new craving
router.post('/', async (req, res) => {
    const result = cravingSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ errors: result.error.format() });
    }
    const { intensity, notes, resolved, type, userId } = result.data;
    try {
        // ✅ Look for existing type (default or custom)
        let cravingType = await prisma_1.default.cravingType.findFirst({
            where: {
                name: type,
                OR: [
                    { isCustom: false },
                    { isCustom: true, userId },
                ],
            },
        });
        // ✅ If not found, create a custom one for this user
        if (!cravingType) {
            cravingType = await prisma_1.default.cravingType.create({
                data: {
                    name: type,
                    isCustom: true,
                    userId,
                },
            });
        }
        // ✅ Create the craving event
        const newCraving = await prisma_1.default.cravingEvent.create({
            data: {
                intensity,
                notes,
                resolved,
                userId,
                type: { connect: { id: cravingType.id } },
            },
            include: { type: true },
        });
        // ✅ XP handling
        let xpGained = 5;
        await prisma_1.default.userProgress.upsert({
            where: { userId },
            update: { xp: { increment: 5 } },
            create: { userId, xp: 5, level: 1 },
        });
        const progress = await prisma_1.default.userProgress.findUnique({ where: { userId } });
        const level = Math.floor(Math.sqrt(progress.xp / 10)) + 1;
        await prisma_1.default.userProgress.update({
            where: { userId },
            data: { level },
        });
        // ✅ Bonus XP if resolved
        if (resolved) {
            xpGained += 10;
            await prisma_1.default.userProgress.update({
                where: { userId },
                data: { xp: { increment: 10 } },
            });
            const updated = await prisma_1.default.userProgress.findUnique({ where: { userId } });
            const updatedLevel = Math.floor(Math.sqrt(updated.xp / 10)) + 1;
            await prisma_1.default.userProgress.update({
                where: { userId },
                data: { level: updatedLevel },
            });
        }
        res.status(201).json({ ...newCraving, xpGained });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create craving' });
    }
});
// ✅ GET craving by ID
router.get('/:id', async (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id))
        return res.status(400).json({ error: 'Invalid ID' });
    try {
        const craving = await prisma_1.default.cravingEvent.findUnique({
            where: { id },
            include: { type: true },
        });
        if (!craving)
            return res.status(404).json({ error: 'Craving not found' });
        res.json(craving);
    }
    catch (error) {
        console.error("Error in GET /:id", error);
        res.status(500).json({ error: 'Failed to fetch craving' });
    }
});
exports.default = router;
