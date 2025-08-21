import dotenv from 'dotenv'

if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

const {
  PORT,
  FRONTEND_URL,
  FIREBASE_KEY,
  ACCESS_TOKEN,
  BACKEND_URL,
  SECRET_KEY,
  CLOUDINARY_API_KEY,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_SECRET
} = process.env

export const port = PORT ?? '0'
export const frontendUrl = FRONTEND_URL ?? ''
export const firebaseKey = FIREBASE_KEY ?? ''
export const accessToken = ACCESS_TOKEN ?? ''
export const backendUrl = BACKEND_URL ?? ''
export const secretKey = SECRET_KEY ?? ''
export const cloudinaryApiKey = CLOUDINARY_API_KEY ?? ''
export const cloudinaryCloudName = CLOUDINARY_CLOUD_NAME ?? ''
export const cloudinaryApiSecret = CLOUDINARY_API_SECRET ?? ''
