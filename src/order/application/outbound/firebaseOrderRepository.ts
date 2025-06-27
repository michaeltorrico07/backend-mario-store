import { db } from '../../../infrastructure/db/firebase'
import { Product } from '../../../product/domain/product'
import { OrderRepository, CreateOrder, Order, OrderTicket, OrderTicketProduct, OrderProduct } from '../../domain/order'

export class FirebaseOrderRespository implements OrderRepository {
  async createOrder (newOrder: CreateOrder): Promise<boolean> {
    await db.collection('orders').add(newOrder)
    return true
  }

  async deliverOrder (idOrder: string): Promise <boolean> {
    const orderRef = db.collection('orders').doc(idOrder)
    await orderRef.update({ delivered: true })
    return true
  }

  async cancelOrder (idOrder: string): Promise <boolean> {
    const orderRef = db.collection('orders').doc(idOrder)
    await orderRef.delete()
    return true
  }

  async getOrdersByUser (idUser: string): Promise<OrderTicket[]> {
    const snapshot = await db.collection('orders').where('idUser', '==', idUser).get()
    const orderTickets: OrderTicket[] = await Promise.all(snapshot.docs.map(async doc => {
      const orderData = doc.data()
      const orderTicket: OrderTicket = {
        code: orderData.code,
        listProducts: [],
        deliverDate: orderData.deliverDate.toDate(),
        delivered: orderData.delivered,
        totalPrice: 0
      }
      await Promise.all(orderData.listProducts.map(async (product: OrderProduct) => {
        const productRef = db.collection('products').doc(product.idProduct)
        const productData = (await productRef.get()).data() as Product
        orderTicket.totalPrice += productData?.price * product.amount
        const orderTicketProduct: OrderTicketProduct = {
          name: productData?.name,
          price: productData?.price,
          amount: product.amount
        }
        orderTicket.listProducts.push(orderTicketProduct)
      }))
      return orderTicket
    }))
    orderTickets.sort((a, b) => a.deliverDate.getTime() - b.deliverDate.getTime())
    return orderTickets
  }

  async getOrderById (idOrder: string): Promise<Order> {
    const snapshot = await db.collection('orders').doc(idOrder).get()
    const order = snapshot.data() as Order
    return order
  }

  async getNextOrders (): Promise<Order[]> {
    const snapshot = await db.collection('orders').get()
    const orders: Order[] = snapshot.docs.map(doc => doc.data() as Order)
    return orders
  }
}
