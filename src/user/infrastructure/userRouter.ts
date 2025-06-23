import { Router } from 'express'
import { UserController } from './userController'
import { AuthMiddleware } from '../../infrastructure/middlewares/AuthMiddleware'

const router = Router()
const controller = new UserController()

router.post('/', controller.createUser)
router.put('/', AuthMiddleware, controller.updateUser)
router.get('/', AuthMiddleware, controller.getUser)

export default router
