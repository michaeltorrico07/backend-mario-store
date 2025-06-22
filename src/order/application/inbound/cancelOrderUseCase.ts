import { OrderUseCase } from '../../domain/order'
import { FirebaseOrderRespository } from '../outbound/firebaseOrderRepository'

const OrderRepository = new FirebaseOrderRespository()

export const cancelOrderUseCase = async (data: string): Promise<OrderUseCase> => {
  try {
    const cancel = await OrderRepository.cancelOrder(data)

    return { success: true, data: cancel, error: null }
  } catch (err) {
    return { success: false, data: null, error: 'Unknown error occurred' }
  }
}
