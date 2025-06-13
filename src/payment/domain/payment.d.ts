import { PreferenceRequest, PreferenceResponse } from 'mercadopago'

export { PreferenceRequest } from 'mercadopago'

export interface PaymentUseCase {
  success: boolean
  data: PreferenceResponse | null
  error: string | null
}

export interface PreferenceCreateData {
  body: PreferenceRequest
  requestOptions?: Options
}
