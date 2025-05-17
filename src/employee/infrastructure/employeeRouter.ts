import { Router } from 'express'
import { ProductController } from './employeeController'

const router = Router()
const controller = new ProductController()

router.get('/:id', controller.getProduct)
router.post('/', controller.addProduct)
router.put('/:id', controller.editProduct)
router.delete('/:id', controller.deleteProduct)

router.get('/', controller.getAllProducts)

export default router
