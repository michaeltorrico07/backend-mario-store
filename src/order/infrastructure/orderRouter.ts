import { Router } from 'express'
import { OrderController } from './orderController'
import { AuthMiddleware } from '../../infrastructure/middlewares/AuthMiddleware'

const router = Router()
const controller = new OrderController()

router.post('/', controller.createOrder)
router.delete('/:id', controller.cancelOrder)
router.put('/:id', controller.deliverOrder)
router.get('/kitchen', controller.getKitchenOrders)
router.get('/', controller.getNextOrders)
router.get('/user', AuthMiddleware, controller.getOrdersByUser)
router.get('/:id', controller.getOrderById)

export default router
