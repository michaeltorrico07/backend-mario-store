/* eslint-disable no-case-declarations */
import { Response, Request } from 'express'
import crypto from 'crypto'
import { secretKey } from '../../../infrastructure/config/envConfig'
export class PaymentWebHookController {
  handleWebHook = async (req: Request, res: Response): Promise<void> => {
    const { topic, type, action } = req.body

    const eventType = topic ?? type

    switch (eventType) {
      case 'payment':
        switch (action) {
          case 'created':
            console.log(eventType, action, req.body)
            const xSignature = req.headers['x-signature'] as string
            const xRequestId = req.headers['x-request-id'] as string

            console.log(req.body)

            const dataID = req.body.data.id?.toString()?.toLowerCase() as string ?? ''

            if (typeof (xSignature) !== 'string') {
              console.log('No x-signature header')
              res.status(400).send('Missing signature')
              return
            }

            const arrayXSignature = xSignature.split(',').reduce<Record<string, string>>((acc, part) => {
              const [key, value] = part.split('=')
              if (typeof key === 'string' && key.trim() !== '' && typeof value === 'string' && value.trim() !== '') acc[key.trim()] = value.trim()
              return acc
            }, {})

            const timestamp = arrayXSignature.ts
            const signature = arrayXSignature.v1

            const manifest = `id:${dataID};request-id:${xRequestId};ts:${timestamp};`

            const cyphedSignature = crypto.createHmac('sha256', secretKey).update(manifest).digest('hex')

            if (cyphedSignature === signature) {
              console.log('HMAC verification passed')
            } else {
              // HMAC verification failed
              console.log('HMAC verification failed')
            }
            break
          case 'updated':
            console.log(eventType, action, req.body)
            break
          case 'refunded':
            console.log(eventType, action, req.body)
            break
          case 'cancelled':
            console.log(eventType, action, req.body)
            break
          case 'chargeback':
            console.log(eventType, action, req.body)
            break
          default:
            console.log('sajdfaisfaoisdhfgaiosgfhoasdgfi', action)
            break
        }
        break
      case 'merchant_order':
        console.log('se recibio ezeta')
        break
      default:
        console.log('unsa a los geis')
        break
    }
    res.status(200)
  }
}
