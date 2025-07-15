import { Response, Request } from 'express'
import { MercadoPagoService } from '../services/mercadoPagoService'
import { validCreateOrder } from '../../../order/domain/orderScheme'
import { createOrderUseCase } from '../../../order/application/inbound'

const mercadopagoService = new MercadoPagoService()

export class PaymentWebHookController {
  handleWebHook = async (req: Request, res: Response): Promise<void> => {
    const { topic, type, action, resource } = req.body
    const event = topic ?? type
    const xSignature = req.headers['x-signature'] as string
    const xRequestId = req.headers['x-request-id'] as string

    console.log(req.body)

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

          console.log('data:', data, null, 2)
          console.log(data.additional_info?.items, null, 2)
          const listProducts = data.additional_info?.items?.map((item: any) => ({
            idProduct: item.id,
            amount: Number(item.quantity),
            price: Number(item.unit_price)
          }))
          const deliverDate = new Date(data.metadata.date)
          const orderPayload = {
            listProducts,
            deliverDate,
            id: data.external_reference
          }
          console.log('data de usecase', orderPayload, data.metadata.id_user)
          const result = validCreateOrder(orderPayload)
          if (!result.success) {
            console.log('errores de schema:', result.error.errors)
            res.status(400)
            return
          }
          if (data?.status === 'approved' && data.status_detail === 'accredited') {
            console.log('guardar en la db la order')
            const response = await createOrderUseCase(result.data, data.metadata.id_user)
            console.log(response)
            res.status(200)
            return
          }
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
