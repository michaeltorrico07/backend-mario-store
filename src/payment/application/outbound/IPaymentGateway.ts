import { PreferenceCreateData, PreferenceResponse, GetPaymentProps, VerifyMercadoPagoHmac } from '../../domain/payment'

export interface IPaymentGateway {
  createPreference: (data: PreferenceCreateData) => Promise<PreferenceResponse>
  getPaymentDetails: ({ paymentId }: GetPaymentProps) => Promise<unknown>
  verifyMercadoPagoHmac: ({ dataId, requestId, xSignature }: VerifyMercadoPagoHmac) => boolean
}
