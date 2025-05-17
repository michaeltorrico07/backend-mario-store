import { Router } from 'express'
import { ProductController } from './productController'

const router = Router()
const productController = new ProductController()

router.get('/:id', productController.getProduct)
router.post('/', productController.addProduct)
router.put('/:id', productController.editProduct)
router.delete('/:id', productController.deleteProduct)

router.get('/', productController.getAllProducts)

export default router
