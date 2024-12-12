import { Router } from 'express'
import zodValidateHandler from '../../middleware/zodValidateHandler'
import auth from '../../middleware/auth'
import { USER_ROLE } from '../user/user.constant'
import {
  createVocabularyZodSchema,
  updateVocabularyZodSchema,
} from './vocabulary.validate'
import { vocabularyController } from './vocabulary.controller'
const router = Router()

router.post(
  '/',
  auth(USER_ROLE.ADMIN),
  zodValidateHandler(createVocabularyZodSchema),
  vocabularyController.insertVocabulary,
)
router.get('/', auth(USER_ROLE.ADMIN), vocabularyController.getAllVocabulary)
router.get(
  '/:id',
  auth(USER_ROLE.ADMIN),
  vocabularyController.getVocabularyById,
)
router.patch(
  '/:id',
  auth(USER_ROLE.ADMIN),
  zodValidateHandler(updateVocabularyZodSchema),
  vocabularyController.updateVocabularyById,
)
router.delete(
  '/:id',
  auth(USER_ROLE.ADMIN),
  vocabularyController.deleteVocabularyById,
)

export { router as vocabularyRouter }
