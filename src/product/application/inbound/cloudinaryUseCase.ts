import { ProductUseCase } from '../../domain/product'
import { v2 } from '../../../infrastructure/config/cloudinaryConfig'

export const cloudinaryUseCase = async (fileBuffer: Buffer): Promise<ProductUseCase> => {
  try {
    const result = await v2.uploader.upload(`data:image/png;base64,${fileBuffer.toString('base64')}`, {
      folder: 'product_management'
    })

    if (result?.secure_url == null) {
      throw new Error('Cloudinary upload failed: No URL received')
    }

    return { success: true, data: result.secure_url, error: null }
  } catch (err) {
    return { success: false, data: null, error: 'Unknown error occurred' }
  }
}
