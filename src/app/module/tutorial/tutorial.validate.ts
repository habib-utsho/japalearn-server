import { z } from 'zod'

const createTutorialZodSchema = z.object({
  title: z.string({
    invalid_type_error: 'Please input string!',
    required_error: 'Tutorial name is required!',
  }),
  link: z.string({
    invalid_type_error: 'Please input string!',
    required_error: 'Tutorial URL is required!',
  }),
  description: z
    .string({
      invalid_type_error: 'Please input number!',
      required_error: 'Tutorial number is required!',
    })
    .optional(),
  lesson: z
    .string({
      invalid_type_error: 'Please input number!',
      required_error: 'Lesson is required!',
    })
    .optional(),
  isDeleted: z.boolean().optional(),
})

const updateTutorialZodSchema = z.object({
  title: z
    .string({
      invalid_type_error: 'Please input string!',
      required_error: 'Tutorial name is required!',
    })
    .optional(),
  link: z
    .string({
      invalid_type_error: 'Please input string!',
      required_error: 'Tutorial URL is required!',
    })
    .optional(),
  description: z
    .string({
      invalid_type_error: 'Please input number!',
      required_error: 'Tutorial number is required!',
    })
    .optional(),
  lesson: z
    .string({
      invalid_type_error: 'Please input number!',
      required_error: 'Lesson is required!',
    })
    .optional(),
  isDeleted: z.boolean().optional(),
})

export { createTutorialZodSchema, updateTutorialZodSchema }
