import { Request, Response } from 'express'
import { validNewProduct, validPartialProduct } from '../domain/productScheme'
import { createProductUseCase, getAllProductsUseCase, getProductByIdUseCase, updateProductUseCase } from '../application/inbound'

export class ProductController {
  createProduct = async (req: Request, res: Response): Promise<void> => {
    const data = req.body
    try {
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
    const data = req.body
    console.log(req.body)
    console.log(id, data)
    try {
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
    console.log(req.query)
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
}
