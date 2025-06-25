import type { IPaymentGateway } from '../outbound/IPaymentGateway'
import type { PreferenceCreateData, PaymentUseCase } from '../../domain/payment'

export class CreatePreferenceUseCase {
  constructor (private readonly paymentGateway: IPaymentGateway) {}

  async execute ({ body }: PreferenceCreateData): Promise<PaymentUseCase> {
    try {
      const response = await this.paymentGateway.createPreference({ body })
      return { success: true, data: response, error: null }
    } catch (err) {
      console.error(err)
      return { success: false, data: null, error: 'Unknown error occurred' }
    }
  }
}
