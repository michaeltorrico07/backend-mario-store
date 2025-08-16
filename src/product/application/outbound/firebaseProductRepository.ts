import { FieldPath } from 'firebase-admin/firestore'
import { db } from '../../../infrastructure/db/firebase'
import { Product, ProductRepository, UpdateProduct, NewProduct } from '../../domain/product'

export class FireBaseProductRepository implements ProductRepository {
  async createProduct (newProduct: NewProduct): Promise<Product> {
    const idProduct = (await db.collection('products').add(newProduct)).id

    const productProcessed = {
      id: idProduct,
      ...newProduct
    }

    return productProcessed
  }

  async getProductById (id: string): Promise<Product | null> {
    const doc = await db
      .collection('products')
      .doc(id)
      .get()

    if (!doc.exists) {
      return null
    }

    const product = doc.data() as Product
    return product
  }

  async updateProduct (setData: UpdateProduct, id: string): Promise<Product | null> {
    const snapshot = await db.collection('products').doc(id).get()
    if (!snapshot.exists) return null

    // Armamos un nuevo objeto de actualización sin campos vacíos
    const updatePayload: Partial<UpdateProduct> = {
      ...setData
    }

    // Si no hay una nueva imagen, eliminamos ese campo para no sobreescribir
    if (setData.image === null || setData.image === undefined || setData.image === '') {
      delete updatePayload.image
    }

    // Ejecutamos la actualización
    await snapshot.ref.update(updatePayload)

    const updatedProduct: Product = {
      ...snapshot.data() as Product,
      ...updatePayload
    }

    return updatedProduct
  }

  async getAllProducts (onlyInMenu: boolean, tags?: string[]): Promise<Product[]> {
    let query: FirebaseFirestore.Query = db.collection('products')

    if (onlyInMenu) {
      query = query.where('inMenu', '==', true)
    }

    const snapshot = await query.get()

    const allProducts: Product[] = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as unknown as Product))
    return allProducts
  }

  async getProductsByIds (ids: String[]): Promise<Product[]> {
    const docs = await db
      .collection('products')
      .where(FieldPath.documentId(), 'in', ids)
      .get()

    const someProducts: Product[] = docs.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as unknown as Product))

    return someProducts
  }
}
