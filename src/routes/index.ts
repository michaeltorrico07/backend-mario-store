import { Router } from 'express'
import orderRouter from '../order/infrastructure/orderRouter'
import productRouter from '../product/infrastructure/productRouter'

const router = Router()

router.use('/product', productRouter)
router.use('/order', orderRouter)

export default router
