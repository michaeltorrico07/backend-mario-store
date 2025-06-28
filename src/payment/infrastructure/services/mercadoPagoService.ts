import { MercadoPagoConfig, Preference } from 'mercadopago'
import { accessToken, backendUrl } from '../../../infrastructure/config/envConfig'
import { IPaymentGateway } from '../../application/outbound/IPaymentGateway'
import { PreferenceCreateData, PreferenceResponse } from '../../domain/payment'

const client = new MercadoPagoConfig({
  accessToken
})

export const preference = new Preference(client)

export class MercadoPagoService implements IPaymentGateway {
  async createPreference (data: PreferenceCreateData): Promise<PreferenceResponse> {
    const response = await preference.create({
      ...data,
      body: {
        ...data.body,
        notification_url: backendUrl
      }
    })
    return response
  }
}
