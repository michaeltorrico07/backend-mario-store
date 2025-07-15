import { OrderUseCase } from '../../domain/order'
import { FirebaseOrderRespository } from '../outbound/firebaseOrderRepository'

const OrderRepository = new FirebaseOrderRespository()

export const getOrderByIdPostaUseCase = async (data: string): Promise<OrderUseCase> => {
  try {
    const order = await OrderRepository.getOrderByIdPosta(data)

    return { success: true, data: order, error: null }
  } catch (err) {
    return { success: false, data: null, error: 'Unknown error occurred' }
  }
}
