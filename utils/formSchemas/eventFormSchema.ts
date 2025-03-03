import { z } from 'zod'

export const createEventSchema = z
  .object({
    image: z.instanceof(File, { message: 'Image is required' }).optional(),
    title: z.string().min(3, 'Minimum 3 characters'),
    description: z.string().optional(),
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
    isOnline: z.boolean(),
    startTime: z.date().optional(),
    endTime: z.date().optional(),
    points: z.number().min(1, 'Має бути більше 0'),
    membersLimit: z.number().min(1).optional(),
    city: z.string().optional(),
    country: z.string().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
  })
  .refine(
    (data) =>
      data.isOnline ||
      (data.city &&
        data.country &&
        data.latitude !== undefined &&
        data.longitude !== undefined),
    {
      message: 'Location is required for offline events',
      path: ['city'],
    }
  )
