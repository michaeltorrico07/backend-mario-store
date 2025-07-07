import { db } from '../../../infrastructure/db/firebase'
import { OrderRepository, CreateOrder, Order, OrderTicket, KitchenOrder } from '../../domain/order'
import { Timestamp } from 'firebase-admin/firestore'

export class FirebaseOrderRespository implements OrderRepository {
  async createOrder (newOrder: CreateOrder, idUser: string): Promise<boolean> {
    const code: string = Math.random().toString(36).substring(2, 7).toUpperCase()
    const order: Order = {
      deliverDate: newOrder.deliverDate,
      listProducts: [],
      idUser,
      delivered: false,
      code,
      totalPrice: 0
    }

    await Promise.all(newOrder.listProducts.map(async product => {
      const productSnapshot = await db.collection('products').doc(product.idProduct).get()
      const productData = productSnapshot.data()
      const listProduct = {
        name: productData?.name,
        amount: product.amount,
        price: productData?.price
      }

      order.listProducts.push(listProduct)
    }))

    await db.collection('orders').add(order)

    return true
  }

  async deliverOrder (idOrder: string): Promise<boolean> {
    const orderRef = db.collection('orders').doc(idOrder)
    await orderRef.update({ delivered: true })
    return true
  }

  async cancelOrder (idOrder: string): Promise<boolean> {
    const orderRef = db.collection('orders').doc(idOrder)
    await orderRef.delete()
    return true
  }

  async getOrdersByUser (idUser: string): Promise<OrderTicket[]> {
    const snapshot = await db.collection('orders').where('idUser', '==', idUser).get()
    const orderTickets: OrderTicket[] = await Promise.all(snapshot.docs.map(async doc => {
      const orderData = doc.data()
      const orderTicket: OrderTicket = {
        id: doc.id,
        code: orderData.code,
        listProducts: orderData.listProducts,
        deliverDate: orderData.deliverDate.toDate(),
        delivered: orderData.delivered,
        totalPrice: orderData.totalPrice
      }
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

  async getOrdersByHour (hour: Date): Promise<OrderTicket[]> {
    const hourTimestamp = Timestamp.fromDate(hour)
    const endHour = Timestamp.fromDate(new Date(hour.getTime() + 10 * 60 * 1000))
    const snapshot = await db.collection('orders').where('deliverDate', '>=', hourTimestamp).where('deliverDate', '<', endHour).get()
    const orderTickets: OrderTicket[] = await Promise.all(
      snapshot.docs.flatMap(doc => {
        const orderData = doc.data()
        const delivered = orderData.delivered as boolean
        if (delivered) return []
        const orderTicket: Promise<OrderTicket> = Promise.resolve({
          id: doc.id,
          code: orderData.code,
          listProducts: orderData.listProducts,
          deliverDate: orderData.deliverDate.toDate(),
          delivered,
          totalPrice: orderData.totalPrice
        })
        return [orderTicket]
      })
    )
    orderTickets.sort((a, b) => a.deliverDate.getTime() - b.deliverDate.getTime())
    return orderTickets
  }

  async getKitchenOrders (): Promise<KitchenOrder[]> {
    const snapshot = await db.collection('orders').get()
    const kitchenOrders: KitchenOrder[] = []

    for (const doc of snapshot.docs) {
      const order = doc.data() as {
        code: string
        listProducts: Array<{ name: string, amount: number, price: number }>
        deliverDate: Date | FirebaseFirestore.Timestamp
        delivered: boolean
        totalPrice: number
      }

      for (const [index, productRef] of order.listProducts.entries()) {
        const deliveryDate = order.deliverDate instanceof Date
          ? order.deliverDate
          : order.deliverDate.toDate()

        const kitchenOrder: KitchenOrder = {
          id: `${order.code}-${index}`,
          quantity: productRef.amount,
          product: productRef.name,
          deliveryTime: deliveryDate,
          status: order.delivered ? 'total_confirmed' : 'pending',
          orderTime: new Date().toISOString() // O order.createdAt si lo tenés
        }

        kitchenOrders.push(kitchenOrder)
      }
    }

    return kitchenOrders
  }
}
