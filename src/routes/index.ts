import { Router } from 'express'
import orderRouter from '../order/infrastructure/orderRouter'
import productRouter from '../product/infrastructure/productRouter'
import userRouter from '../user/infrastructure/userRouter'

const router = Router()

router.use('/product', productRouter)
router.use('/order', orderRouter)
router.use('/user', userRouter)

export default router
