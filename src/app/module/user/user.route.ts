import { NextFunction, Request, Response, Router } from 'express'
import zodValidateHandler from '../../middleware/zodValidateHandler'
import { userController } from './user.controller'
import auth from '../../middleware/auth'
import { USER_ROLE } from './user.constant'
import { upload } from '../../utils/uploadImgToCloudinary'
import { createUserZodSchema } from './user.validation'

const router = Router()

router.post(
  '/',
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body?.data)
    next()
  },
  zodValidateHandler(createUserZodSchema),
  userController.insertUser,
)

router.delete('/:id', auth(USER_ROLE.ADMIN), userController.deleteUserById)
router.patch(
  '/toggle-role/:id',
  auth(USER_ROLE.ADMIN),
  userController.toggleUserRoleById,
)

router.get('/me', auth(USER_ROLE.ADMIN, USER_ROLE.USER), userController.getMe)

router.get('/', userController.getAllUsers)
router.get('/:id', userController.getUserById)

export { router as userRouter }
