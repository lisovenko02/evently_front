import { z } from 'zod'

export const updateTaskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  dueDate: z.date().optional(),
})

export type FormValues = z.infer<typeof updateTaskSchema>
