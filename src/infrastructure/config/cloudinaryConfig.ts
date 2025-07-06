import cloudinary from 'cloudinary'
import { cloudinaryApiKey, cloudinaryCloudName, cloudinaryApiSecret } from './envConfig.js'

export const v2 = cloudinary.v2.config({
  cloud_name: cloudinaryCloudName,
  api_key: cloudinaryApiKey,
  api_secret: cloudinaryApiSecret
})
