import { db } from '../../../infrastructure/db/firebase'
import { OrderRepository, CreateOrder, Order } from '../../domain/order'

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

  async getOrdersByUser (idUser: string): Promise<Order[]> {
    const snapshot = await db.collection('orders').where('idUser', '==', idUser).get()
    const orders: Order[] = snapshot.docs.map(doc => {
      const order = doc.data()
      order.deliverDate = order.deliverDate.toDate()
      return order as Order
    })
    orders.sort((a, b) => a.deliverDate.getTime() - b.deliverDate.getTime())
    return orders
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
