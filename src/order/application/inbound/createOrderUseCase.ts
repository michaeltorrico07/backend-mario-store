import { CreateOrder, OrderUseCase } from '../../domain/order'
import { FirebaseOrderRespository } from '../outbound/firebaseOrderRepository'

const OrderRepository = new FirebaseOrderRespository()

export const createOrderUseCase = async (data: CreateOrder, idUser: string): Promise<OrderUseCase> => {
  try {
    const createOrder = await OrderRepository.createOrder(data, idUser)

    return { success: true, data: createOrder, error: null }
  } catch (err) {
    return { success: false, data: null, error: 'Unknown error occurred' }
  }
}
