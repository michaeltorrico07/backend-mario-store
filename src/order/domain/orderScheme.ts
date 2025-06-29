import { SafeParseReturnType, z } from 'zod'

const orderSchema = z.object({
  idUser: z
    .string({
      invalid_type_error: 'idUser must be string',
      required_error: 'idUser is required'
    })
    .nonempty('idUser cannot be empty'),
  listProducts: z
    .array(
      z.object({
        idProduct: z
          .string({
            invalid_type_error: 'idProduct must be string',
            required_error: 'idProduct is required'
          }),
        price: z
          .number({
            invalid_type_error: 'price must be number',
            required_error: 'price is required'
          })
          .nonnegative('price cannot be negative')
          .int('price must be integer'),
        amount: z
          .number({
            invalid_type_error: 'amount must be number',
            required_error: 'amount is required'
          })
          .nonnegative('amount cannot be negative')
          .int('amount must be integer')
      })
    ),
  deliverDate: z
    .date({
      invalid_type_error: 'deliverDate must be date',
      required_error: 'deliverDate is required'
    }),
  delivered: z
    .boolean({
      required_error: 'delivired is required'
    }),
  totalPrice: z
    .number({
      invalid_type_error: 'totalPrice must be number',
      required_error: 'totalPrice is required'
    }),
  code: z
    .string({
      invalid_type_error: 'code must be string',
      required_error: 'code is required'
    })
})

export function validOrder (input: unknown): SafeParseReturnType<unknown, z.infer<typeof orderSchema>> {
  return orderSchema.safeParse(input)
}

const createOrderSchema = orderSchema.omit({ delivered: true, code: true })

export function validCreateOrder (input: unknown): SafeParseReturnType<unknown, z.infer<typeof createOrderSchema>> {
  return createOrderSchema.safeParse(input)
}

const orderTicketSchema = orderSchema.omit({ idUser: true })

export function validOrderTicket (input: unknown): SafeParseReturnType<unknown, z.infer<typeof orderTicketSchema>> {
  return orderTicketSchema.safeParse(input)
}
