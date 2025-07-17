import { Request, Response } from 'express'
import { validNewProduct, validPartialProduct } from '../domain/productScheme'
import { createProductUseCase, getAllProductsUseCase, getProductByIdUseCase, updateProductUseCase, cloudinaryUseCase } from '../application/inbound'

export class ProductController {
  createProduct = async (req: Request, res: Response): Promise<void> => {
    const data = JSON.parse(req.body.productData)
    const image = req.file?.buffer
    try {
      if (!(image instanceof Buffer)) throw new Error('Wrong File Type')
      const imageUrl = (await cloudinaryUseCase(image)).data as string
      data.image = imageUrl
      const result = validNewProduct(data)
      if (!result.success) {
        res
          .status(400)
          .json({ error: 'Bad request', errors_messages: result.error.errors })
        return
      }
      const response = await createProductUseCase(result.data)
      if (!response.success) {
        res
          .status(500)
          .json({ error: response.error })
      }
      res
        .status(200)
        .json({ success: response.success, data: response.data, error: response.error })
    } catch (err) {
      console.log(err)
      res
        .status(500)
        .json({ error: 'Internal Server Error' })
    }
  }

  getProductById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    try {
      const response = await getProductByIdUseCase(id)
      if (!response.success) {
        res
          .status(404)
          .json({ success: response.success, data: response.data, error: response.error })
      }
      res
        .status(200)
        .json({ success: response.success, data: response.data, error: response.error })
    } catch (err) {
      console.log(err)
      res
        .status(500)
        .json({ error: 'Internal Server Error' })
    }
  }

  updateProduct = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    const data = JSON.parse(req.body.productData)
    const image = req?.file?.buffer
    try {
      let imageUrl = ''
      if (image instanceof Buffer) {
        imageUrl = (await cloudinaryUseCase(image)).data as string
      }
      data.image = imageUrl
      const result = validPartialProduct(data)
      if (!result.success) {
        res
          .status(400)
          .json({ error: 'Bad request', errors_messages: result.error.errors })
        return
      }
      const response = await updateProductUseCase(result.data, id)
      res
        .status(200)
        .json({ success: response.success, data: response.data, error: response.error })
    } catch (err) {
      console.log(err)
      res
        .status(500)
        .json({ error: 'Internal Server Error' })
    }
  }

  getAllProducts = async (req: Request, res: Response): Promise<void> => {
    let { tags } = req.query
    if (typeof (tags) === 'string') {
      tags = Array.of(tags)
    }
    try {
      const response = await getAllProductsUseCase(tags as string[])
      res
        .status(200)
        .json({ success: response.success, data: response.data, error: response.error })
    } catch (err) {
      console.log(err)
      res
        .status(500)
        .json({ error: 'Internal Server Error' })
    }
  }

  uploadImage = async (req: Request, res: Response): Promise<void> => {
    const image = req.file?.buffer
    try {
      if (!(image instanceof Buffer)) throw new Error('Wrong File Type')
      const response = await cloudinaryUseCase(image)
      if (response.success === false) {
        res
          .status(500)
          .json({ error: response.error })
        return
      }
      res
        .status(200)
        .json({ success: response.success, data: response.data, error: response.error })
    } catch (err) {
      console.log(err)
      res
        .status(500)
        .json({ error: 'Internal Server Error' })
    }
  }
}
