import { z } from "zod";

const createBatchZodSchema = z.object({
    department: z.string({invalid_type_error: 'Please input string!', required_error: 'Academic department name is required!'}),
})
const updateBatchZodSchema = z.object({
    department: z.string({invalid_type_error: 'Please input string!', required_error: 'Academic department name is required!'}).optional()
})

export {createBatchZodSchema, updateBatchZodSchema}