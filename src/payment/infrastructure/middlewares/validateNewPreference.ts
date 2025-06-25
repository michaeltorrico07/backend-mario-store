import { Request, Response, NextFunction } from 'express'
import { validatePreferenceBody } from '../../domain/schemaBodyPreference'

export const validatePreferenceBodyMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const result = validatePreferenceBody(req.body)

  if (!result.success) {
    res.status(400).json({
      error: 'Bad request',
      errors_messages: result.error.errors
    })
    return
  }

  req.body = result.data
  next()
}
