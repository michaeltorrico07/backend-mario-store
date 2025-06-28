import dotenv from 'dotenv'

if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

const {
  PORT,
  FRONTEND_URL,
  FIREBASE_KEY,
  ACCESS_TOKEN,
  BACKEND_URL
} = process.env

export const port = PORT ?? '0'
export const frontendUrl = FRONTEND_URL ?? ''
export const firebaseKey = FIREBASE_KEY ?? ''
export const accessToken = ACCESS_TOKEN ?? ''
export const backendUrl = BACKEND_URL ?? ''
