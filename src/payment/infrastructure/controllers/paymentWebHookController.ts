import { Response, Request } from 'express'

export class PaymentWebHookController {
  handleWebHook = async (req: Request, res: Response): Promise<void> => {
    const xSignature = req.headers['x-signature'] as string
    const { type, data, action } = req.body

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

    console.log(req.body)
    console.log(timestamp, signature)
    switch (type) {
      case 'payment':
        console.log(data, action)
        break
      case 'chargebacks':
        break
      default:
        console.log('unsa a los geis')
        break
    }
    console.log('webhook')
    res.status(200)
  }
}
