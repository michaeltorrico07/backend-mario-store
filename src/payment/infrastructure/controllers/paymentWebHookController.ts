import { Response, Request } from 'express'

export class PaymentWebHookController {
  handleWebHook = async (req: Request, res: Response): Promise<void> => {
    console.log(req)
    console.log('webhook')
  }
}
