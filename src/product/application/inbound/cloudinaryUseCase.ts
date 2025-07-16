import { ProductUseCase } from '../../domain/product'
import { cloudinary } from '../../../infrastructure/config/cloudinaryConfig'

export const cloudinaryUseCase = async (fileBuffer: Buffer): Promise<ProductUseCase> => {
  try {
    console.log(cloudinary.uploader)
    const result = await cloudinary.uploader.upload(`data:image/png;base64,${fileBuffer.toString('base64')}`, {
      folder: 'product_management'
    })

    if (result?.secure_url == null) {
      throw new Error('Hubo un error al subir la imagen a Cloudinary')
    }

    return { success: true, data: result.secure_url, error: null }
  } catch (err) {
    console.log(err)
    return { success: false, data: null, error: 'Unknown error occurred' }
  }
}
