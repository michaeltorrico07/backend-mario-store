import { Request, Response } from 'express'
import { validUser, validUpdateUser } from '../domain/userSchema'
import { createUserUseCase, updateUserUseCase, getUserUseCase } from '../application/inbound'

export class UserController {
  createUser = async (req: Request, res: Response): Promise<void> => {
    const data = req.body
    try {
      const result = validUser(data)
      if (!result.success) {
        res
          .status(400)
          .json({ error: 'Bad request', errors_messages: result.error.errors })
        return
      }
      const response = await createUserUseCase(result.data)
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

  updateUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    const data = req.body
    try {
      const result = validUpdateUser(data)
      if (!result.success) {
        res
          .status(400)
          .json({ error: 'Bad request', errors_messages: result.error.errors })
        return
      }
      const response = await updateUserUseCase(result.data, id)
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

  getUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    try {
      const response = await getUserUseCase(id)
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
}
