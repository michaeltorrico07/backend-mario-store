import { Request, Response } from 'express'
import { validCreateOrder } from '../domain/orderScheme'
import { createOrderUseCase, cancelOrderUseCase, deliverOrderUseCase, getOrdersByUserOrderUseCase } from '../application/inbound'

export class OrderController {
  createOrder = async (req: Request, res: Response): Promise<void> => {
    const data = req.body
    try {
      const result = validCreateOrder(data)
      if (!result.success) {
        res
          .status(400)
          .json({ error: 'Bad request', errors_messages: result.error.errors })
        return
      }
      const response = await createOrderUseCase(result.data)

      if (!response.success) {
        res
          .status(500)
          .json({ error: response.error })
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

  cancelOrder = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    try {
      const response = await cancelOrderUseCase(id)

      if (!response.success) {
        res
          .status(500)
          .json({ error: response.error })
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

  deliverOrder = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    try {
      const response = await deliverOrderUseCase(id)

      if (!response.success) {
        res
          .status(500)
          .json({ error: response.error })
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

  getOrdersByUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    try {
      const response = await getOrdersByUserOrderUseCase(id)

      if (!response.success) {
        res
          .status(500)
          .json({ error: response.error })
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
}
