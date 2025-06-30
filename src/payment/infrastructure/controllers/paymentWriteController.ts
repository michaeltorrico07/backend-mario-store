import { Response } from 'express'
import { CreatePreferenceUseCase } from '../../application/inbound'
import { MercadoPagoService } from '../services/mercadoPagoService'
import { PreferenceRequest, ReqValidatedBody } from '../../domain/payment'

const mercadopagoService = new MercadoPagoService()
const createPreferenceUseCase = new CreatePreferenceUseCase(mercadopagoService)

export class PaymentWriteController {
  createPreference = async (req: ReqValidatedBody, res: Response): Promise<void> => {
    const { data } = req
    try {
      const result = await createPreferenceUseCase.execute({ body: (data as PreferenceRequest) })
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
