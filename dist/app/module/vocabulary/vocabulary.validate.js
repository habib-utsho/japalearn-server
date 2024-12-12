"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVocabularyZodSchema = exports.createVocabularyZodSchema = void 0;
const zod_1 = require("zod");
const createVocabularyZodSchema = zod_1.z.object({
    word: zod_1.z.string({
        invalid_type_error: 'Please input a valid word!',
        required_error: 'Word is required!',
    }),
    meaning: zod_1.z.string({
        invalid_type_error: 'Please input a valid meaning!',
        required_error: 'Meaning is required!',
    }),
    pronunciation: zod_1.z.string({
        invalid_type_error: 'Please input a valid pronunciation!',
        required_error: 'Pronunciation is required!',
    }),
    whenToSay: zod_1.z.string({
        invalid_type_error: 'Please input valid when-to-say details!',
        required_error: 'When to say is required!',
    }),
    lessonNumber: zod_1.z.number({
        invalid_type_error: 'Please input a valid lesson number!',
        required_error: 'Lesson number is required!',
    }),
    adminEmail: zod_1.z
        .string({ required_error: 'Admin email is required' })
        .email({ message: 'Invalid email address' }),
    isDeleted: zod_1.z.boolean().optional(),
});
exports.createVocabularyZodSchema = createVocabularyZodSchema;
const updateVocabularyZodSchema = zod_1.z.object({
    word: zod_1.z
        .string({
        invalid_type_error: 'Please input a valid word!',
    })
        .optional(),
    meaning: zod_1.z
        .string({
        invalid_type_error: 'Please input a valid meaning!',
    })
        .optional(),
    pronunciation: zod_1.z
        .string({
        invalid_type_error: 'Please input a valid pronunciation!',
    })
        .optional(),
    whenToSay: zod_1.z
        .string({
        invalid_type_error: 'Please input valid when-to-say details!',
    })
        .optional(),
    lessonNumber: zod_1.z
        .number({
        invalid_type_error: 'Please input a valid lesson number!',
    })
        .optional(),
    isDeleted: zod_1.z
        .boolean({
        invalid_type_error: 'Please input a valid boolean value for isDeleted!',
    })
        .optional(),
});
exports.updateVocabularyZodSchema = updateVocabularyZodSchema;
