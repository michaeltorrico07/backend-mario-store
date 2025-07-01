import { db } from '../../../infrastructure/db/firebase'
import { Product } from '../../../product/domain/product'
import { OrderRepository, CreateOrder, Order, OrderTicket, OrderTicketProduct, OrderProduct, KitchenOrder } from '../../domain/order'

export class FirebaseOrderRespository implements OrderRepository {
  async createOrder (newOrder: CreateOrder): Promise<boolean> {
    await db.collection('orders').add(newOrder)
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
          id: productData?.id,
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

  async getNextOrders (): Promise<OrderTicket[]> {
    const snapshot = await db.collection('orders').get()
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
          id: productData?.id,
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

  async getKitchenOrders (): Promise<KitchenOrder[]> {
    const snapshot = await db.collection('orders').get()
    const kitchenOrders: KitchenOrder[] = []

    for (const doc of snapshot.docs) {
      const order = doc.data() as {
        code: string
        listProducts: Array<{ idProduct: string, amount: number }>
        deliverDate: Date | FirebaseFirestore.Timestamp
        delivered: boolean
        totalPrice: number
      }

      for (const [index, productRef] of order.listProducts.entries()) {
        if (productRef.idProduct === '') {
          console.warn(`Producto sin ID en la orden ${order.code}`)
          continue
        }

        const productSnap = await db.collection('products').doc(productRef.idProduct).get()

        if (!productSnap.exists) {
          console.warn(`Producto con ID ${productRef.idProduct} no encontrado`)
          continue
        }

        const productData = productSnap.data() as { name: string, price: number }

        const deliveryDate = order.deliverDate instanceof Date
          ? order.deliverDate
          : order.deliverDate.toDate()

        const kitchenOrder: KitchenOrder = {
          id: `${order.code}-${index}`,
          quantity: productRef.amount,
          product: productData.name,
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
