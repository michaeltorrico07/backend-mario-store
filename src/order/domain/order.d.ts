export interface Order {
  idUser: string
  listProducts: OrderProduct[]
  deliverDate: Date
  delivered: boolean
  code: string
}

export interface OrderProduct {
  idProduct: string
  amount: number
}

export interface OrderTicket {
  code: string
  listProducts: OrderTicketProduct[]
  deliverDate: Date
  delivered: boolean
  totalPrice: number
}

export interface OrderTicketProduct {
  id: string
  name: string
  price: number
  amount: number
}

export interface KitchenOrder {
  id: string
  quantity: number
  product: string
  deliveryTime: Date
  status: 'pending' | 'unit_confirmed' | 'total_confirmed'
  orderTime: string
}

export type CreateOrder = Omit<Order, 'delivered' | 'code'>

export interface OrderUseCase {
  success: boolean
  data: OrderTicket | OrderTicket[] | KitchenOrder[] | Order | Order[] | boolean | null
  error: string | null
}

export interface OrderRepository {
  createOrder: (order: CreateOrder) => Promise<boolean>
  deliverOrder: (idOrder: string) => Promise<boolean>
  cancelOrder: (idOrder: string) => Promise<boolean>
  getOrdersByUser: (idUser: string) => Promise<OrderTicket[]>
  getOrderById: (idOrder: string) => Promise<Order>
  getNextOrders: () => Promise<OrderTicket[]>
  getKitchenOrders: () => Promise<KitchenOrder[]>
}
