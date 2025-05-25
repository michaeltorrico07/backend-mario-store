import { Request, Response } from 'express'
import { validNewProduct } from '../domain/productScheme'
import { createProductUseCase } from '../application/inbound/index'

export class ProductController {
  createProduct = async (req: Request, res: Response): Promise<void> => {
    const data = req.body
    try {
      const result = validNewProduct(data)
      if (!result.success) {
        res.status(400).send({ error: 'Bad request' })
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
        .json({ product: response.product })
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

  }
}
