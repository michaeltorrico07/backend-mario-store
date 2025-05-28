interface OrderProduct {
  idProduct: string
  amount: number
  price: number
}

export interface Order {
  idUser: string
  listProducts: OrderProduct[]
  deliverDate: string
  delivered: boolean
}

export type CreateOrder = Omit<Order, 'delivered'>

export interface OrderUseCase {
  success: boolean
  data: null | Order[] | boolean
  error: string | null
}

export interface OrderRepository {
  createOrder: (order: Order) => Promise<boolean>
  deliverOrder: (idOrder: string) => Promise<boolean>
  cancelOrder: (idOrder: string) => Promise<boolean>
  getOrdersByUser: (idUser: string) => Promise<Order[]>
}
