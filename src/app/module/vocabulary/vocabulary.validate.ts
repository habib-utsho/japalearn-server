import { z } from 'zod'

const createVocabularyZodSchema = z.object({
  word: z.string({
    invalid_type_error: 'Please input a valid word!',
    required_error: 'Word is required!',
  }),
  meaning: z.string({
    invalid_type_error: 'Please input a valid meaning!',
    required_error: 'Meaning is required!',
  }),
  pronunciation: z.string({
    invalid_type_error: 'Please input a valid pronunciation!',
    required_error: 'Pronunciation is required!',
  }),
  whenToSay: z.string({
    invalid_type_error: 'Please input valid when-to-say details!',
    required_error: 'When to say is required!',
  }),
  lessonNumber: z.number({
    invalid_type_error: 'Please input a valid lesson number!',
    required_error: 'Lesson number is required!',
  }),
  adminEmail: z
    .string({ required_error: 'Admin email is required' })
    .email({ message: 'Invalid email address' }),
  isDeleted: z.boolean().optional(),
})

const updateVocabularyZodSchema = z.object({
  word: z
    .string({
      invalid_type_error: 'Please input a valid word!',
    })
    .optional(),
  meaning: z
    .string({
      invalid_type_error: 'Please input a valid meaning!',
    })
    .optional(),
  pronunciation: z
    .string({
      invalid_type_error: 'Please input a valid pronunciation!',
    })
    .optional(),
  whenToSay: z
    .string({
      invalid_type_error: 'Please input valid when-to-say details!',
    })
    .optional(),
  lessonNumber: z
    .number({
      invalid_type_error: 'Please input a valid lesson number!',
    })
    .optional(),
  isDeleted: z
    .boolean({
      invalid_type_error: 'Please input a valid boolean value for isDeleted!',
    })
    .optional(),
})

export { createVocabularyZodSchema, updateVocabularyZodSchema }
