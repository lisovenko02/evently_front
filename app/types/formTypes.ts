import { EventCategory, EventVisibility } from './eventTypes'

export interface CreateEventFormValues {
  title: string
  description?: string
  category: EventCategory
  visibility: EventVisibility
  isOnline: boolean
  address?: string
  city?: string
  country?: string
  latitude?: number
  longitude?: number
  points?: number
  maxParticipants?: number
  image?: File
}
