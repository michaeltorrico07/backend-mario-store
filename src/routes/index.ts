import { Router } from 'express'

import employeeRouter from '../employee/infrastructure/employeeRouter'
import productRouter from '../product/infrastructure/productRouter'

const router = Router()

router.use('/employee', employeeRouter)
router.use('/product', productRouter)

export default router
