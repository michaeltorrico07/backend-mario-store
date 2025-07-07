import { MercadoPagoConfig, Preference } from 'mercadopago'
import { accessToken, secretKey, backendUrl, frontendUrl } from '../../../infrastructure/config/envConfig'
import { IPaymentGateway } from '../../application/outbound/IPaymentGateway'
import { PreferenceCreateData, PreferenceResponse, GetPaymentProps, VerifyMercadoPagoHmac, PaymentResponse } from '../../domain/payment'
import crypto from 'crypto'

const client = new MercadoPagoConfig({
  accessToken
})

export const preference = new Preference(client)

export class MercadoPagoService implements IPaymentGateway {
  async createPreference (data: PreferenceCreateData): Promise<PreferenceResponse> {
    const response = await preference.create({
      body: {
        ...data.body,
        notification_url: `${backendUrl}/payment/webhook`,
        back_urls: {
          success: `${frontendUrl}/productos`
        },
        statement_descriptor: 'LA STORE DE MARIO'
      }
    })
    return response
  }

  async getPaymentDetails ({ paymentId }: GetPaymentProps): Promise<PaymentResponse> {
    const idAsString = paymentId
    const response = await fetch(`https://api.mercadopago.com/v1/payments/${idAsString}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })
    console.log(response)
    return await response.json()
  }

  verifyMercadoPagoHmac ({ dataId, xSignature, requestId }: VerifyMercadoPagoHmac): boolean {
    const arrayXSignature = xSignature.split(',').reduce<Record<string, string>>((acc, part) => {
      const [key, value] = part.split('=')
      if (typeof key === 'string' && key.trim() !== '' && typeof value === 'string' && value.trim() !== '') acc[key.trim()] = value.trim()
      return acc
    }, {})

    const timestamp = arrayXSignature.ts
    const signature = arrayXSignature.v1

    const manifest = `id:${dataId};request-id:${requestId};ts:${timestamp};`
    const cyphedSignature = crypto.createHmac('sha256', secretKey).update(manifest).digest('hex')
    return cyphedSignature === signature
  }
}
