"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTutorialZodSchema = exports.createTutorialZodSchema = void 0;
const zod_1 = require("zod");
const createTutorialZodSchema = zod_1.z.object({
    title: zod_1.z.string({
        invalid_type_error: 'Please input string!',
        required_error: 'Tutorial name is required!',
    }),
    link: zod_1.z.string({
        invalid_type_error: 'Please input string!',
        required_error: 'Tutorial URL is required!',
    }),
    description: zod_1.z
        .string({
        invalid_type_error: 'Please input number!',
        required_error: 'Tutorial number is required!',
    })
        .optional(),
    lesson: zod_1.z
        .string({
        invalid_type_error: 'Please input number!',
        required_error: 'Lesson is required!',
    })
        .optional(),
    isDeleted: zod_1.z.boolean().optional(),
});
exports.createTutorialZodSchema = createTutorialZodSchema;
const updateTutorialZodSchema = zod_1.z.object({
    title: zod_1.z
        .string({
        invalid_type_error: 'Please input string!',
        required_error: 'Tutorial name is required!',
    })
        .optional(),
    link: zod_1.z
        .string({
        invalid_type_error: 'Please input string!',
        required_error: 'Tutorial URL is required!',
    })
        .optional(),
    description: zod_1.z
        .string({
        invalid_type_error: 'Please input number!',
        required_error: 'Tutorial number is required!',
    })
        .optional(),
    lesson: zod_1.z
        .string({
        invalid_type_error: 'Please input number!',
        required_error: 'Lesson is required!',
    })
        .optional(),
    isDeleted: zod_1.z.boolean().optional(),
});
exports.updateTutorialZodSchema = updateTutorialZodSchema;
