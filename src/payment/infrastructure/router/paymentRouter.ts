import { Router } from 'express'
import { PaymentWriteController, PaymentWebHookController } from '../controllers'
import { validatePreferenceBodyMiddleware } from '../middlewares/validateNewPreference'

const router = Router()
const writeController = new PaymentWriteController()
const webHookController = new PaymentWebHookController()

router.post('/', validatePreferenceBodyMiddleware, writeController.createPreference)
router.post('/webhook', webHookController.handleWebHook)

export default router
