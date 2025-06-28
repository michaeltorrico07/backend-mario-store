import { Response, Request } from 'express'

export class PaymentWebHookController {
  handleWebHook = async (req: Request, res: Response): Promise<void> => {
    const { header } = req
    const { type, data, action } = req.body
    console.log(header)
    console.log(req.body)
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
