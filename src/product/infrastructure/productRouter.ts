import { Router } from 'express'
import { ProductController } from './productController'
import { AuthMiddleware } from '../../infrastructure/middlewares/AuthMiddleware'
import upload from '../../infrastructure/config/multerConfig'

const router = Router()
const controller = new ProductController()

router.post('/image', upload.single('image'), controller.uploadImage)
router.get('/:id', controller.getProductById)
router.post('/', upload.single('image'), controller.createProduct)
router.put('/:id', AuthMiddleware, controller.updateProduct)
router.get('/', controller.getAllProducts)

export default router
