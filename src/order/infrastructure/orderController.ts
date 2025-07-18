import { Request, Response } from 'express'
import { CustomRequest } from '../../infrastructure/domain/auth'
import { cancelOrderUseCase, deliverOrderUseCase, getOrdersByUserUseCase, getOrderByIdUseCase, getOrdersByHourUseCase, getKitchenProductsUseCase } from '../application/inbound'

export class OrderController {
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

  getOrdersByUser = async (req: CustomRequest, res: Response): Promise<void> => {
    const id = req?.user?.uid as string
    try {
      const response = await getOrdersByUserUseCase(id)

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

  getOrderById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    try {
      const response = await getOrderByIdUseCase(id)

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

  getOrdersByHour = async (req: Request, res: Response): Promise<void> => {
    const { date } = req.query
    const data = new Date(date as string)
    try {
      const response = await getOrdersByHourUseCase(data)

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

  getKitchenProducts = async (req: Request, res: Response): Promise<void> => {
    const { date } = req.query
    const data = new Date(date as string)
    try {
      const response = await getKitchenProductsUseCase(data)
      if (!response.success) {
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
