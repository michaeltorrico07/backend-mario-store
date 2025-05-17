import { Router } from 'express'
import { ProductController } from './productController'

const router = Router()
const controller = new ProductController()

router.get('/:id', controller.getProduct)
router.post('/', controller.createProduct)
router.put('/:id', controller.updateProduct)
router.get('/', controller.getAllProducts)

export default router
