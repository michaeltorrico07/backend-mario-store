import { Response, NextFunction } from 'express'
import { auth } from '../db/firebase'
import { CustomRequest } from '../domain/auth'

// Middleware para validar el token de Firebase
export const AuthMiddleware = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  const { authorization } = req.headers
  console.log(authorization)

  if (authorization == null || !authorization.startsWith('Bearer ')) {
    console.log('')
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  try {
    const idToken = authorization.split(' ')[1]
    const decodedToken = await auth.verifyIdToken(idToken)

    req.user = decodedToken
    next()
  } catch (error) {
    res.status(401).json({ message: 'Invalid Firebase token' })
  }
}
