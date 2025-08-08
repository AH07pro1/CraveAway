"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cravingSchema = void 0;
const zod_1 = require("zod");
exports.cravingSchema = zod_1.z.object({
    intensity: zod_1.z.number().min(1).max(10),
    notes: zod_1.z.string().optional(),
    resolved: zod_1.z.boolean(),
    type: zod_1.z.string({
        required_error: "Type is required",
        invalid_type_error: "Type must be a string",
    }),
    userId: zod_1.z.string()
});
