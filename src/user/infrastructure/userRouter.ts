import { Router } from 'express'
import { UserController } from './userController'

const router = Router()
const controller = new UserController()

router.post('/', controller.createUser)
router.put('/:id', controller.updateUser)
router.get('/:id', controller.getUser)

export default router
