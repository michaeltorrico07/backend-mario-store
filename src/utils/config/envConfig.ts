import dotenv from 'dotenv'

if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

const {
  PORT,
  FRONTEND_URL,
  FIREBASE_KEY
} = process.env

export const port = PORT ?? '0'
export const frontendUrl = FRONTEND_URL ?? ''
export const firebaseKey = FIREBASE_KEY ?? ''
