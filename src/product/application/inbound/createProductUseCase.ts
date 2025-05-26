import { NewProduct, ProductUseCase } from '../../domain/product'
import { FireBaseProductRepository } from '../outbound/firebaseProductRepository'

const ProductRepository = new FireBaseProductRepository()

export const createProductUseCase = async (data: NewProduct): Promise<ProductUseCase> => {
  try {
    const newProduct = await ProductRepository.createProduct(data)

    return { success: true, data: newProduct, error: null }
  } catch (err) {
    return { success: false, data: null, error: 'Unknown error occurred' }
  }
}
