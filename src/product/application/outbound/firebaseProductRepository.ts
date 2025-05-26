import { db } from '../../../infrastructure/db/firebase'
import { Product, ProductRepository, UpdateProduct, NewProduct } from '../../domain/product'
import { v4 as uuidv4 } from 'uuid'

export class FireBaseProductRepository implements ProductRepository {
  async createProduct (newProduct: NewProduct): Promise<Product> {
    const generatedId = uuidv4()
    const productProcessed = {
      _uuid: generatedId,
      name: newProduct.name,
      tags: newProduct.tags,
      description: newProduct.description,
      image: newProduct.image,
      price: newProduct.price
    }
    const productRef = db.collection('products').doc()
    await productRef.set(productProcessed)
    return productProcessed
  }

  async getProductById (id: string): Promise<Product | null> {
    const snapshot = await db
      .collection('products')
      .where('_uuid', '==', id)
      .limit(1)
      .get()
    if (snapshot.empty) {
      return null
    }
    const product = snapshot.docs[0].data() as unknown as Product
    return product
  }

  async updateProduct (setData: UpdateProduct, id: string): Promise<Product | null> {
    const snapshot = await db
      .collection('products')
      .where('_uuid', '==', id)
      .limit(1)
      .get()
    if (snapshot.empty) return null

    await snapshot.docs[0].ref.update(setData)

    const updatedProduct: Product = {
      ...snapshot.docs[0].data() as unknown as Product,
      ...setData
    }
    return updatedProduct
  }

  async getAllProducts (tags?: string[]): Promise<Product[]> {
    let query: FirebaseFirestore.Query = db.collection('products')

    if (tags !== undefined && tags.length > 0) {
      query = query.where('tags', 'array-contains-any', tags)
    }

    const snapshot = await query.get()

    const allProducts: Product[] = snapshot.docs.map(doc => doc.data() as Product)

    return allProducts
  }
}
