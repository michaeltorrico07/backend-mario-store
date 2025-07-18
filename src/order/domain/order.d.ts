export interface Order {
  id: string
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
  id: string
}

export interface CreateOrderProduct {
  quantity: number
  idProduct: string
  amount: number
  price: number
}

export interface OrderTicket {
  id: string
  code: string
  listProducts: OrderProduct[]
  deliverDate: Date
  delivered: boolean
  totalPrice: number
}

export interface KitchenProduct {
  name: string
  amount: number
  amountConfirmed: number
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
  getKitchenProducts: (data: Date) => Promise<KitchenProduct[]>
}
