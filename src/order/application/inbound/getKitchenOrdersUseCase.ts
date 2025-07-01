import { OrderUseCase } from '../../domain/order'
import { FirebaseOrderRespository } from '../outbound/firebaseOrderRepository'

const OrderRepository = new FirebaseOrderRespository()

export const getKitchenOrdersUseCase = async (): Promise<OrderUseCase> => {
  try {
    const orders = await OrderRepository.getKitchenOrders()

    return { success: true, data: orders, error: null }
  } catch (err) {
    console.log(err)
    return { success: false, data: null, error: 'Unknown error occurred' }
  }
}
