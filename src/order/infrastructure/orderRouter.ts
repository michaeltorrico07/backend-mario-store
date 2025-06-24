import { Router } from 'express'
import { OrderController } from './orderController'

const router = Router()
const controller = new OrderController()

router.post('/', controller.createOrder)
router.delete('/:id', controller.cancelOrder)
router.put('/:id', controller.deliverOrder)
router.get('/', controller.getNextOrders)
router.get('/:id', controller.getOrderById)
router.get('/user/', controller.getOrdersByUser)

export default router
