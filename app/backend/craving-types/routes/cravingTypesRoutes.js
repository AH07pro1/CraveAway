"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prisma_1 = __importDefault(require("../../lib/prisma"));
const zod_1 = require("zod");
const router = express_1.default.Router();
// Zod schema for craving type validation
const cravingTypeSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(50),
    userId: zod_1.z.string(),
});
// // Middleware to mock user authentication (replace with real auth)
// function mockAuthMiddleware(req: Request, res: Response, next: any) {
//   // This is just a demo. In real apps, decode token etc.
//   req.user = { id: 'some-user-id' }; 
//   next();
// }
// // Extend Express Request interface for `user`
// declare global {
//   namespace Express {
//     interface Request {
//       user?: { id: string };
//     }
//   }
// }
// // Protect all routes below with auth
// router.use(mockAuthMiddleware);
// GET all craving types for user and built-in types
router.get("/", async (req, res) => {
    const userId = req.query.userId;
    if (!userId)
        return res.status(400).json({ error: "Missing userId" });
    try {
        const types = await prisma_1.default.cravingType.findMany({
            where: {
                OR: [
                    { isCustom: false }, // Default types
                    { isCustom: true, userId: userId }, // User's custom types
                ],
            },
            orderBy: { name: "asc" },
        });
        res.json(types);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch craving types" });
    }
});
// -------- POST create custom type ----------
router.post("/", async (req, res) => {
    const result = cravingTypeSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ errors: result.error.format() });
    }
    const { name, userId } = result.data;
    try {
        const newType = await prisma_1.default.cravingType.create({
            data: {
                name,
                isCustom: true,
                userId, // 👈 saved with owner
            },
        });
        res.status(201).json(newType);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create craving type" });
    }
});
// PUT update a custom craving type owned by user
router.put('/:id', async (req, res) => {
    const userId = req.user.id;
    const id = Number(req.params.id);
    if (isNaN(id))
        return res.status(400).json({ error: 'Invalid ID' });
    const result = cravingTypeSchema.safeParse(req.body);
    if (!result.success)
        return res.status(400).json({ errors: result.error.format() });
    try {
        // Only update if custom and owned by this user
        const existingType = await prisma_1.default.cravingType.findUnique({ where: { id } });
        if (!existingType)
            return res.status(404).json({ error: 'Type not found' });
        if (!existingType.isCustom || existingType.userId !== userId) {
            return res.status(403).json({ error: 'Not authorized to edit this type' });
        }
        const updatedType = await prisma_1.default.cravingType.update({
            where: { id },
            data: { name: result.data.name },
        });
        res.json(updatedType);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update craving type' });
    }
});
// DELETE custom craving type owned by user
router.delete('/:id', async (req, res) => {
    const userId = req.user.id;
    const id = Number(req.params.id);
    if (isNaN(id))
        return res.status(400).json({ error: 'Invalid ID' });
    try {
        const existingType = await prisma_1.default.cravingType.findUnique({ where: { id } });
        if (!existingType)
            return res.status(404).json({ error: 'Type not found' });
        if (!existingType.isCustom || existingType.userId !== userId) {
            return res.status(403).json({ error: 'Not authorized to delete this type' });
        }
        await prisma_1.default.cravingType.delete({ where: { id } });
        res.status(204).send();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete craving type' });
    }
});
exports.default = router;
