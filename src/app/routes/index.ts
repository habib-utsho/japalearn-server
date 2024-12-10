import { Router } from 'express'
import { userRouter } from '../module/user/user.route'
import { authRouter } from '../module/auth/auth.route'

const router = Router()
const routes = [
  {
    path: '/users',
    route: userRouter,
  },
  {
    path: '/auth',
    route: authRouter,
  },
]

routes.forEach((route) => router.use(route.path, route.route))

export default router
