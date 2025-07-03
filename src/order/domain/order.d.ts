export interface Order {
  idUser: string
  listProducts: OrderProduct[]
  deliverDate: Date
  delivered: boolean
  code: string
  totalPrice: number
}

export interface OrderProduct {
  name: string
  amount: number
  price: number
}

export interface CreateOrder {
  listProducts: CreateOrderProduct[]
  deliverDate: Date
}

export interface CreateOrderProduct {
  idProduct: string
  amount: number
}

export interface OrderTicket {
  id: string
  code: string
  listProducts: OrderProduct[]
  deliverDate: Date
  delivered: boolean
  totalPrice: number
}

export interface KitchenOrder {
  id: string
  quantity: number
  product: string
  deliveryTime: Date
  status: 'pending' | 'unit_confirmed' | 'total_confirmed'
  orderTime: string
}

export interface OrderUseCase {
  success: boolean
  data: OrderTicket | OrderTicket[] | KitchenOrder[] | Order | Order[] | boolean | null
  error: string | null
}

export interface OrderRepository {
  createOrder: (order: CreateOrder, idUser: string) => Promise<boolean>
  deliverOrder: (idOrder: string) => Promise<boolean>
  cancelOrder: (idOrder: string) => Promise<boolean>
  getOrdersByUser: (idUser: string) => Promise<OrderTicket[]>
  getOrderById: (idOrder: string) => Promise<Order>
  getOrdersByHour: (hour: Date) => Promise<OrderTicket[]>
  getKitchenOrders: () => Promise<KitchenOrder[]>
}
