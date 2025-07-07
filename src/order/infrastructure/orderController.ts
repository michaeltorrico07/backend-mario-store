import { Request, Response } from 'express'
import { validCreateOrder } from '../domain/orderScheme'
import { CustomRequest } from '../../infrastructure/domain/auth'
import { createOrderUseCase, cancelOrderUseCase, deliverOrderUseCase, getOrdersByUserUseCase, getOrderByIdUseCase, getOrdersByHourUseCase, getKitchenOrdersUseCase } from '../application/inbound'

export class OrderController {
  createOrder = async (req: Request, res: Response): Promise<void> => {
    const data = req.body
    data.deliverDate = new Date(data.deliverDate)
    try {
      const result = validCreateOrder(data)
      if (!result.success) {
        res
          .status(400)
          .json({ error: 'Bad request', errors_messages: result.error.errors })
        return
      }
      const response = await createOrderUseCase(result.data, 'jQkKwF3sO3cP0l2RTwq6xVcMptf1')

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

  getKitchenOrders = async (req: Request, res: Response): Promise<void> => {
    try {
      const response = await getKitchenOrdersUseCase()
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
