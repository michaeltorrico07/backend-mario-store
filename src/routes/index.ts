import { Router } from 'express'

import employeeRouter from '../employee/infrastructure/employeeRouter'
import orderRouter from '../order/infrastructure/orderRouter'
import productRouter from '../product/infrastructure/productRouter'

const router = Router()

router.use('/employees', employeeRouter)
router.use('/orders', orderRouter)
router.use('/products', productRouter)

export default router
