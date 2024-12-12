import { Router } from 'express'
import auth from '../../middleware/auth'
import { USER_ROLE } from '../user/user.constant'
import { statsControllers } from './stats.controller'

const router = Router()

router.get('/admin', auth(USER_ROLE.ADMIN), statsControllers.getAdminStats)

export { router as statsRouter }
