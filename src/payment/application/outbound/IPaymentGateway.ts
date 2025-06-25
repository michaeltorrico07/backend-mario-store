import { PreferenceCreateData, PreferenceResponse } from '../../domain/payment'

export interface IPaymentGateway {
  createPreference: ({ body, requestOptions }: PreferenceCreateData) => Promise<PreferenceResponse>

}
