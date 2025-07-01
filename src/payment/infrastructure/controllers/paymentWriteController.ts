import { Response } from 'express'
import { CreatePreferenceUseCase } from '../../application/inbound'
import { MercadoPagoService } from '../services/mercadoPagoService'
import { PreferenceRequest, ReqValidatedBody } from '../../domain/payment'
import { v4 as uuidv4 } from 'uuid'

const mercadopagoService = new MercadoPagoService()
const createPreferenceUseCase = new CreatePreferenceUseCase(mercadopagoService)

export class PaymentWriteController {
  createPreference = async (req: ReqValidatedBody, res: Response): Promise<void> => {
    const { data } = req
    const orderId = uuidv4()
    const body = {
      ...data,
      external_reference: orderId
    }
    try {
      const result = await createPreferenceUseCase.execute({ body: (body as PreferenceRequest) })
      res
        .status(200)
        .json({ success: result.success, data: result.data?.init_point, error: result.error })
    } catch (err) {
      console.log(err)
      res
        .status(500)
        .json({ error: 'Internal Server Error' })
    }
  }
}
