import { PreferenceResponse, PreferenceRequest } from 'mercadopago/dist/clients/preference/commonTypes'
import { Options } from 'mercadopago/dist/types'
import { Request } from 'express'
export { PreferenceResponse, PreferenceRequest } from 'mercadopago/dist/clients/preference/commonTypes'

export interface PaymentUseCase {
  success: boolean
  data: PreferenceResponse | null
  error: string | null
}

export interface PreferenceCreateData {
  body: PreferenceRequest
  requestOptions?: Options
}

export interface ReqValidatedBody extends Request {
  data?: PreferenceRequest
}
