import { z } from 'zod'

export const createEventSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),

  category: z.enum([
    'SPORTS',
    'MUSIC',
    'EDUCATION',
    'BUSINESS',
    'TECH',
    'ART',
    'GAMING',
    'OTHER',
  ]),

  visibility: z.enum(['OPEN', 'CLOSED', 'PRIVATE']),

  isOnline: z.boolean(),

  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),

  latitude: z.number().optional(),
  longitude: z.number().optional(),

  points: z.number().optional(),
  maxParticipants: z.number().optional(),

  image: z.instanceof(File).optional(),
})

export type CreateEventFormValues = z.infer<typeof createEventSchema>
