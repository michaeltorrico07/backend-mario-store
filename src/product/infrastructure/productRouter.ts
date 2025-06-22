import { Router } from 'express'
import { ProductController } from './productController'
import { AuthMiddleware } from '../../infrastructure/middlewares/AuthMiddleware'

const router = Router()
const controller = new ProductController()

router.get('/:id', controller.getProductById)
router.post('/', AuthMiddleware, controller.createProduct)
router.put('/:id', AuthMiddleware, controller.updateProduct)
router.get('/', controller.getAllProducts)

export default router
