import { z } from 'zod'

const itemSchema = z.object({
  title: z.string(),
  quantity: z.number().int().positive(),
  unit_price: z.number().nonnegative(),
  id: z.string().optional(),
  description: z.string().optional(),
  picture_url: z.string().url().optional(),
  category_id: z.string().optional()
}).strict()

const payerSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  surname: z.string().min(1, 'El apellido es requerido'),
  email: z.string().email('El email debe ser válido')
})

const preferenceBodySchema = z.object({
  items: z.array(itemSchema).min(1, 'Debe haber al menos un ítem'),
  payer: payerSchema,
  additional_info: z.object({
    date: z.string()
  })
}).strict()

export function validatePreferenceBody (input: unknown): z.SafeParseReturnType<unknown, z.infer<typeof preferenceBodySchema>> {
  return preferenceBodySchema.safeParse(input)
}
