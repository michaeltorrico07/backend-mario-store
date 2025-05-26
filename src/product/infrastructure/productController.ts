import { Request, Response } from 'express'
import { validNewProduct } from '../domain/productScheme'
import { createProductUseCase } from '../application/inbound/index'
import { getAllProductsUseCase } from '../application/inbound/getAllProductsUseCase'

export class ProductController {
  createProduct = async (req: Request, res: Response): Promise<void> => {
    const data = req.body
    try {
      const result = validNewProduct(data)
      if (!result.success) {
        res.status(400).send({ error: 'Bad request', errors_messages: result.error.errors })
        return
      }
      const response = await createProductUseCase(result.data)
      if (!response.success) {
        res
          .status(500)
          .json({ error: response.error })
        return
      }
      res
        .status(200)
        .json({ succes: response.success, data: response.data, error: response.error })
    } catch (err) {
      console.log(err)
      res
        .status(500)
        .json({ error: 'Internal Server Error' })
    }
  }

  getProduct = async (req: Request, res: Response): Promise<void> => {

  }

  updateProduct = async (req: Request, res: Response): Promise<void> => {

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
        .json({ succes: response.success, data: response.data, error: response.error })
    } catch (err) {
      console.log(err)
      res
        .status(500)
        .json({ error: 'Internal Server Error' })
    }
  }
}
