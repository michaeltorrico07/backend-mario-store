/* eslint-disable no-case-declarations */
import { Response, Request } from 'express'
import { MercadoPagoService } from '../services/mercadoPagoService'

const mercadopagoService = new MercadoPagoService()

export class PaymentWebHookController {
  handleWebHook = async (req: Request, res: Response): Promise<void> => {
    const { topic, type } = req.body
    const event = topic ?? type
    console.log(req.body)
    switch (event) {
      case 'payment':
        const { action, resource } = req.body
        if (action !== undefined) {
          switch (action) {
            case 'payment.created':
              const xSignature = req.headers['x-signature'] as string
              const xRequestId = req.headers['x-request-id'] as string
              const dataId = req.body.data.id?.toString()?.toLowerCase() ?? ''
              const response = mercadopagoService.verifyMercadoPagoHmac({ xSignature, requestId: xRequestId, dataId })
              if (response) {
                console.log('pass')
              } else {
                console.log('passnt')
              }

              break
          }
        }
        if (resource !== undefined) {
          console.log(resource)
          const data = await mercadopagoService.getPaymentDetails({ paymentId: resource })
          console.log(data)
        }
        break
      case 'merchant_order':
        console.log('recibido', req.body)
        break
      default:
        console.log('wdkjawifawsfhasgfhaws', req.body)
        break
    }
    res.status(200)
  }
}
