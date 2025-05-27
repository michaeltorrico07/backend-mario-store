import { SafeParseReturnType, z } from 'zod'

const productSchema = z.object({
  _uuid: z
    .string({
      invalid_type_error: '_uuid must be string',
      required_error: '_uuid is required'
    })
    .nonempty('_uuid cannot be empty')
    .trim(),

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

  tags: z
    .array(
      z.string()
    )
    .min(1, 'at least one tag is required'),

  image: z
    .string({
      invalid_type_error: 'image_path must be string',
      required_error: 'image_path is required'
    })
    .nonempty('image_path cannot be empty')
    .url('image_path must be a valid URL'),

  price: z
    .number({
      invalid_type_error: 'price must be number',
      required_error: 'price is required'
    })
    .nonnegative('price cannot be negative')
    .int('price must be integer')
})

const createProductSchema = productSchema.omit({
  _uuid: true
})

const partialProductSchema = productSchema.omit({ _uuid: true }).partial()

export function validProduct (input: unknown): SafeParseReturnType<unknown, z.infer<typeof productSchema>> {
  return productSchema.safeParse(input)
}

export function validPartialProduct (input: unknown): SafeParseReturnType<unknown, z.infer<typeof partialProductSchema>> {
  return partialProductSchema.safeParse(input)
}

export function validNewProduct (input: unknown): SafeParseReturnType<unknown, z.infer<typeof createProductSchema>> {
  return createProductSchema.safeParse(input)
}
