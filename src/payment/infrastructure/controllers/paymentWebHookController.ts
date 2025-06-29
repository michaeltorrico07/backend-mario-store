/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-case-declarations */
import { Response, Request } from 'express'
import crypto from 'crypto'
import { accessToken, secretKey } from '../../../infrastructure/config/envConfig'
export class PaymentWebHookController {
  handleWebHook = async (req: Request, res: Response): Promise<void> => {
    const { topic } = req.body

    console.log(req.body)

    const response = await fetch(`https://api.mercadopago.com/v1/payments/${req.body.resource}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    console.log(response, response.json())
    switch (topic) {
      case 'payment':

        const response = await fetch(`https://api.mercadopago.com/v1/payments/${req.body.resource}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        console.log(response)
        const action = response.status as unknown as string
        switch (action) {
          case 'payment.created':
            console.log(topic, action, req.body)
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
          default:
            console.log('sajdfaisfaoisdhfgaiosgfhoasdgfi', action)
            break
        }
        break
      case 'merchant_order':
        console.log('se recibio ezeta')
        break
      default:
        console.log('unsa a los geis', topic, req.body)
        break
    }
    res.status(200)
  }
}
