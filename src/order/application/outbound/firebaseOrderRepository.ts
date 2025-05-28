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
    const orders: Order[] = snapshot.docs.map(doc => doc.data() as Order)
    return orders
  }
}
