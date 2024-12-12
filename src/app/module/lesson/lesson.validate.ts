import { z } from 'zod'

const createLessonZodSchema = z.object({
  name: z.string({
    invalid_type_error: 'Please input string!',
    required_error: 'Lesson name is required!',
  }),
  number: z.number({
    invalid_type_error: 'Please input number!',
    required_error: 'Lesson number is required!',
  }),
})
const updateLessonZodSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Please input string!',
    })
    .optional(),
  number: z
    .number({
      invalid_type_error: 'Please input number!',
    })
    .optional(),
})

export { createLessonZodSchema, updateLessonZodSchema }
