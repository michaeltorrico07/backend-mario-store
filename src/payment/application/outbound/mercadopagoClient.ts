import { MercadoPagoConfig, Preference } from 'mercadopago'
import { accessToken } from '../../../infrastructure/config/envConfig'

const client = new MercadoPagoConfig({
  accessToken
})

export const preference = new Preference(client)
