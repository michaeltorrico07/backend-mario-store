import { ProductUseCase, UpdateProduct } from '../../domain/product'
import { FireBaseProductRepository } from '../outbound/firebaseProductRepository'

const productRepository = new FireBaseProductRepository()

export const updateProductUseCase = async (setData: UpdateProduct, id: string): Promise<ProductUseCase> => {
  try {
    const response = await productRepository.updateProduct(setData, id)

    if (response === null) return { success: true, data: null, error: 'not found' }

    return { success: true, data: response, error: null }
  } catch (err) {
    return { success: false, data: null, error: 'Unknown error occurred' }
  }
}
