import { PreferenceCreateData, PreferenceResponse, GetPaymentProps, VerifyMercadoPagoHmac, PaymentResponse } from '../../domain/payment'

export interface IPaymentGateway {
  createPreference: (data: PreferenceCreateData) => Promise<PreferenceResponse>
  getPaymentDetails: ({ paymentId }: GetPaymentProps) => Promise<PaymentResponse>
  verifyMercadoPagoHmac: ({ dataId, requestId, xSignature }: VerifyMercadoPagoHmac) => boolean
}
