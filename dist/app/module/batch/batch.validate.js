"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBatchZodSchema = exports.createBatchZodSchema = void 0;
const zod_1 = require("zod");
const createBatchZodSchema = zod_1.z.object({
    department: zod_1.z.string({ invalid_type_error: 'Please input string!', required_error: 'Academic department name is required!' }),
});
exports.createBatchZodSchema = createBatchZodSchema;
const updateBatchZodSchema = zod_1.z.object({
    department: zod_1.z.string({ invalid_type_error: 'Please input string!', required_error: 'Academic department name is required!' }).optional()
});
exports.updateBatchZodSchema = updateBatchZodSchema;
