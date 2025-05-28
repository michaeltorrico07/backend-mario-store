import { OrderUseCase } from '../../domain/order'
import { FirebaseOrderRespository } from '../outbound/firebaseOrderRepository'

const OrderRepository = new FirebaseOrderRespository()

export const deliverOrderUseCase = async (data: string): Promise<OrderUseCase> => {
  try {
    const deliver = await OrderRepository.deliverOrder(data)

    return { success: true, data: deliver, error: null }
  } catch (err) {
    return { success: false, data: null, error: 'Unknown error occurred' }
  }
}
