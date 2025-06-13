import { Router } from 'express'
import { PaymentController } from './paymentController'

const router = Router()
const controller = new PaymentController()

router.get('/', controller.createOrder)

export default router
