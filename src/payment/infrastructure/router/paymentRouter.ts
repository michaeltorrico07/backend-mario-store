import { Router } from 'express'
import { PaymentController } from '../controllers/paymentWriteController'
import { validatePreferenceBodyMiddleware } from '../middlewares/validateNewPreference'

const router = Router()
const controller = new PaymentController()

router.post('/', validatePreferenceBodyMiddleware, controller.createOrder)

export default router
