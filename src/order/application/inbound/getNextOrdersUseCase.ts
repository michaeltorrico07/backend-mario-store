import { OrderUseCase } from '../../domain/order'
import { FirebaseOrderRespository } from '../outbound/firebaseOrderRepository'

const OrderRepository = new FirebaseOrderRespository()

export const getNextOrdersUseCase = async (): Promise<OrderUseCase> => {
  try {
    const orders = await OrderRepository.getNextOrders()

    return { success: true, data: orders, error: null }
  } catch (err) {
    return { success: false, data: null, error: 'Unknown error occurred' }
  }
}
