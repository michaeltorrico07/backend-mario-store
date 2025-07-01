import { Response, Request } from 'express'
import { MercadoPagoService } from '../services/mercadoPagoService'

const mercadopagoService = new MercadoPagoService()

export class PaymentWebHookController {
  handleWebHook = async (req: Request, res: Response): Promise<void> => {
    const { topic, type, action, resource } = req.body
    const event = topic ?? type
    const xSignature = req.headers['x-signature'] as string
    const xRequestId = req.headers['x-request-id'] as string

    console.log(req.body)
    console.log(req.headers)

    switch (event) {
      case 'payment':
        if (action !== undefined) {
          switch (action) {
            case 'payment.created':{
              const dataId = req.body.data.id?.toString()?.toLowerCase() ?? ''

              const response = mercadopagoService.verifyMercadoPagoHmac({ xSignature, requestId: xRequestId, dataId })
              if (response) {
                console.log('pass')
              } else {
                console.log('passnt')
              }

              break
            }
            default:{
              console.log(action)
              break
            }
          }
        }
        if (resource !== undefined) {
          const dataId = req.body.resource ?? ''

          const response = mercadopagoService.verifyMercadoPagoHmac({ xSignature, requestId: xRequestId, dataId })
          if (response) {
            console.log('pass')
          } else {
            console.log('passnt')
          }

          const data = await mercadopagoService.getPaymentDetails({ paymentId: resource })

          console.log(JSON.stringify(data.additional_info?.items, null, 2))
          console.log(data.additional_info?.payer)
          console.log(data.payer?.email)

          if (data?.status === 'approved' && data.status_detail === 'accredited') console.log('guardar en la db la order')
        }
        break
      case 'merchant_order': {
        console.log('recibido la merchant')
        break
      }
      default:{
        console.log('wdkjawifawsfhasgfhaws')
        break
      }
    }
    res.status(200)
  }
}
