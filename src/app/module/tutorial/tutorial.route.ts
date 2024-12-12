import { Router } from 'express'
import zodValidateHandler from '../../middleware/zodValidateHandler'
import auth from '../../middleware/auth'
import { USER_ROLE } from '../user/user.constant'
import { tutorialController } from './tutorial.controller'
import {
  createTutorialZodSchema,
  updateTutorialZodSchema,
} from './tutorial.validate'

const router = Router()

router.post(
  '/',
  auth(USER_ROLE.ADMIN),
  zodValidateHandler(createTutorialZodSchema),
  tutorialController.insertTutorial,
)
router.get('/', tutorialController.getAllTutorials)
router.get('/:id', tutorialController.getTutorialById)
router.patch(
  '/:id',
  auth(USER_ROLE.ADMIN),
  zodValidateHandler(updateTutorialZodSchema),
  tutorialController.updateTutorialById,
)
router.delete(
  '/:id',
  auth(USER_ROLE.ADMIN),
  tutorialController.deleteTutorialById,
)

export { router as tutorialRouter }
