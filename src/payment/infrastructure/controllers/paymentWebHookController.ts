/* eslint-disable no-case-declarations */
import { Response, Request } from 'express'
import { MercadoPagoService } from '../services/mercadoPagoService'

const mercadopagoService = new MercadoPagoService()

export class PaymentWebHookController {
  handleWebHook = async (req: Request, res: Response): Promise<void> => {
    const { topic, type } = req.body
    const event = topic ?? type
    const xSignature = req.headers['x-signature'] as string
    const xRequestId = req.headers['x-request-id'] as string
    const dataId = req.body?.data?.id != null
      ? req.body.data.id.toString().toLowerCase()
      : req.body?.resource?.split('/')?.pop()
    const response = mercadopagoService.verifyMercadoPagoHmac({ xSignature, requestId: xRequestId, dataId })
    if (response) {
      console.log('pass')
    } else {
      console.log('passnt')
      console.log(req.body)
      res.status(400).json({ error: 'credenciales invalidas' })
      return
    }
    switch (event) {
      case 'payment':
        const { action, resource } = req.body
        if (action !== undefined) {
          switch (action) {
            case 'payment.created':
              console.log(req.body)
              console.log('se creo un pago')
              break
            default:
              console.log(action, req.body)
              break
          }
        }
        if (resource !== undefined) {
          console.log(resource)
          console.log(req.headers)
          const data = await mercadopagoService.getPaymentDetails({ paymentId: resource })
          console.log(JSON.stringify(data.additional_info?.items, null, 2))
          console.log(data.additional_info?.payer)
          console.log(data.payer?.email)
          if (data?.status === 'approved' && data.status_detail === 'accredited') console.log('guardar en la db la order')
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
