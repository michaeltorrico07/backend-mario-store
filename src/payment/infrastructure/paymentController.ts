import { Request, Response } from 'express'
import { createPreferenceUseCase } from '../application/inbound'
import { validatePreferenceBody } from '../domain/schemaBodyPreference'

export class PaymentController {
  createOrder = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = validatePreferenceBody(req.body)
      if (!result.success) {
        res
          .status(400)
          .json({ error: 'Bad request', errors_messages: result.error.errors })
        return
      }
      const response = await createPreferenceUseCase(result.data)
      res
        .status(200)
        .json({ init_point: response.data.init_point })
    } catch (err) {
      console.log(err)
      res
        .status(500)
        .json({ error: 'Internal Server Error' })
    }
  }
}
