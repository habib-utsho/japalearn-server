"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLessonZodSchema = exports.createLessonZodSchema = void 0;
const zod_1 = require("zod");
const createLessonZodSchema = zod_1.z.object({
    name: zod_1.z.string({
        invalid_type_error: 'Please input string!',
        required_error: 'Lesson name is required!',
    }),
    number: zod_1.z.number({
        invalid_type_error: 'Please input number!',
        required_error: 'Lesson number is required!',
    }),
});
exports.createLessonZodSchema = createLessonZodSchema;
const updateLessonZodSchema = zod_1.z.object({
    name: zod_1.z
        .string({
        invalid_type_error: 'Please input string!',
    })
        .optional(),
    number: zod_1.z
        .number({
        invalid_type_error: 'Please input number!',
    })
        .optional(),
});
exports.updateLessonZodSchema = updateLessonZodSchema;
