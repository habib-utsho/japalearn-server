import { Router } from "express"
import { batchController } from "./batch.controller"
import zodValidateHandler from "../../middleware/zodValidateHandler"
import { createBatchZodSchema } from "./batch.validate"

const router = Router()

router.post(
  '/',
  zodValidateHandler(createBatchZodSchema),
  batchController.insertBatch,
)
router.get('/', batchController.getAllBatches)
router.get('/:id', batchController.getBatchById)

export { router as batchRouter }
