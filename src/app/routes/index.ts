import { Router } from 'express'
import { userRouter } from '../module/user/user.route'
import { authRouter } from '../module/auth/auth.route'
import { lessonRouter } from '../module/lesson/lesson.route'
import { vocabularyRouter } from '../module/vocabulary/vocabulary.route'
import { statsRouter } from '../module/stats/stats.route'

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
  {
    path: '/lesson',
    route: lessonRouter,
  },
  {
    path: '/vocabulary',
    route: vocabularyRouter,
  },
  {
    path: '/stats',
    route: statsRouter,
  },
]

routes.forEach((route) => router.use(route.path, route.route))

export default router
