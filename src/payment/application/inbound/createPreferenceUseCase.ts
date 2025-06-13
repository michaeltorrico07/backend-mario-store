import { PaymentUseCase, PreferenceRequest } from '../../domain/payment'
import { preference } from '../outbound/mercadopagoClient'

export const createPreferenceUseCase = async (body: PreferenceRequest): Promise<PaymentUseCase> => {
  try {
    const response = await preference.create({ body })
    return { success: true, data: response, error: null }
  } catch (err) {
    console.log(err)
    return { success: false, data: null, error: 'Unknown error occurred' }
  }
}
