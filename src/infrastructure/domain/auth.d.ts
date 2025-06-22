import { Request } from 'express'

interface UserPayload {
  aud: string
  auth_time: number
  email?: string
  email_verified?: boolean
  firebase: {
    [key: string]: any
    identities: {
      [key: string]: any
    }
    sign_in_provider: string
    sign_in_second_factor?: string
    second_factor_identifier?: string
    tenant?: string
  }
  exp: number
  iat: number
  iss: string
  phone_number?: string | undefined
  picture?: string | undefined
  sub: string
  uid: string
}

export interface CustomRequest extends Request {
  user?: UserPayload
}
