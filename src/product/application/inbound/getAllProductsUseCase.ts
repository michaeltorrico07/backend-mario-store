import { ProductUseCase } from '../../domain/product'
import { FireBaseProductRepository } from '../outbound/firebaseProductRepository'

const productRepository = new FireBaseProductRepository()

export const getAllProductsUseCase = async (tags?: string[]): Promise<ProductUseCase> => {
  try {
    const products = await productRepository.getAllProducts(tags)

    return { success: true, data: products, error: null }
  } catch (err) {
    return { success: false, data: null, error: 'Unknown error occurred' }
  }
}
