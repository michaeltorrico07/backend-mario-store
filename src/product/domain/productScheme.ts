import { SafeParseReturnType, z } from 'zod'

const productSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'name must be string',
      required_error: 'name is required'
    })
    .nonempty('name cannot be empty')
    .max(30, 'name is too long (max 100 characters)'),

  description: z
    .string({
      invalid_type_error: 'description must be string',
      required_error: 'description is required'
    })
    .max(200, 'description is too long (max 200 characters)'),

  category: z
    .enum(['Comida', 'Bebida', 'Snack']),

  image: z
    .string({
      invalid_type_error: 'image must be string',
      required_error: 'image is required'
    }),

  price: z
    .number({
      invalid_type_error: 'price must be number',
      required_error: 'price is required'
    })
    .nonnegative('price cannot be negative')
    .int('price must be integer'),

  inMenu: z
    .boolean()
})

const createProductSchema = productSchema

const partialProductSchema = productSchema.partial()

export function validPartialProduct (input: unknown): SafeParseReturnType<unknown, z.infer<typeof partialProductSchema>> {
  return partialProductSchema.safeParse(input)
}

export function validNewProduct (input: unknown): SafeParseReturnType<unknown, z.infer<typeof createProductSchema>> {
  return createProductSchema.safeParse(input)
}
