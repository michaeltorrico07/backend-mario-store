import { OrderUseCase } from '../../domain/order'
import { FirebaseOrderRespository } from '../outbound/firebaseOrderRepository'

const OrderRepository = new FirebaseOrderRespository()

export const getOrdersByUserOrderUseCase = async (data: string): Promise<OrderUseCase> => {
  try {
    const orders = await OrderRepository.getOrdersByUser(data)

    return { success: true, data: orders, error: null }
  } catch (err) {
    return { success: false, data: null, error: 'Unknown error occurred' }
  }
}
