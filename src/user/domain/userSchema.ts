import { SafeParseReturnType, z } from 'zod'

const userSchema = z.object({
  id: z
    .string({
      invalid_type_error: 'id must be string',
      required_error: 'id is required'
    })
    .nonempty('id cannot be empty'),
  name: z
    .string({
      invalid_type_error: 'name must be string',
      required_error: 'name is required'
    })
    .nonempty('name cannot be empty'),
  lastName: z
    .string({
      invalid_type_error: 'lastName must be string',
      required_error: 'lastName is required'
    })
    .nonempty('lastName cannot be empty'),
  email: z
    .string({
      invalid_type_error: 'email must be string',
      required_error: 'email is required'
    })
    .nonempty('email cannot be empty')
    .email('email must be a valid email address')
})

const updateUserSchema = userSchema.omit({ id: true }).partial()

export function validUser (input: unknown): SafeParseReturnType<unknown, z.infer<typeof userSchema>> {
  return userSchema.safeParse(input)
}

export function validUpdateUser (input: unknown): SafeParseReturnType<unknown, z.infer<typeof updateUserSchema>> {
  return updateUserSchema.safeParse(input)
}
