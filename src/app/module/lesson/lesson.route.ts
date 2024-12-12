import { Router } from 'express'
import zodValidateHandler from '../../middleware/zodValidateHandler'
import auth from '../../middleware/auth'
import { USER_ROLE } from '../user/user.constant'
import { createLessonZodSchema, updateLessonZodSchema } from './lesson.validate'
import { lessonController } from './lesson.controller'

const router = Router()

router.post(
  '/',
  auth(USER_ROLE.ADMIN),
  zodValidateHandler(createLessonZodSchema),
  lessonController.insertLesson,
)
router.get('/', auth(USER_ROLE.ADMIN), lessonController.getAllLessons)
router.get('/:lessonNumber', auth(USER_ROLE.ADMIN), lessonController.getLessonById)
router.patch(
  '/:id',
  auth(USER_ROLE.ADMIN),
  zodValidateHandler(updateLessonZodSchema),
  lessonController.updateLessonById,
)
router.delete('/:id', auth(USER_ROLE.ADMIN), lessonController.deleteLessonById)

export { router as lessonRouter }
