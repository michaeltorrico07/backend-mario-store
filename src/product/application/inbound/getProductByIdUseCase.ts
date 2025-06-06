import { ProductUseCase } from '../../domain/product'
import { FireBaseProductRepository } from '../outbound/firebaseProductRepository'

const movieRepository = new FireBaseProductRepository()

export const getProductByIdUseCase = async (id: string): Promise<ProductUseCase> => {
  try {
    const product = await movieRepository.getProductById(id)

    if (product === null) return { success: false, data: null, error: 'product not found' }

    return { success: true, data: product, error: null }
  } catch (err) {
    return { success: false, data: null, error: 'Unknown error occurred' }
  }
}
