import { Response, NextFunction } from 'express'
import { validatePreferenceBody } from '../../domain/schemaBodyPreference'
import { PreferenceRequest, ReqValidatedBody } from '../../domain/payment'

export const validatePreferenceBodyMiddleware = (req: ReqValidatedBody, res: Response, next: NextFunction): void => {
  const result = validatePreferenceBody(req.body)

  if (!result.success) {
    res.status(400).json({
      error: 'Bad request',
      errors_messages: result.error.errors
    })
    return
  }
  req.data = result.data as unknown as PreferenceRequest

  next()
}
