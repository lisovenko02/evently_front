import { z } from 'zod'

export const authFormSchema = (type: string) => {
  return z.object({
    email: z.string().email('Invalid email').min(5, 'Too short'),
    password: z.string().min(6, 'Password must be at least 6 characters'),

    username:
      type === 'register'
        ? z.string().min(3, 'Username must be at least 3 characters')
        : z.string().optional(),

    firstName:
      type === 'register'
        ? z.string().min(3, 'First name must be at least 3 characters')
        : z.string().optional(),

    lastName:
      type === 'register'
        ? z.string().min(3, 'Last name must be at least 3 characters')
        : z.string().optional(),
  })
}
