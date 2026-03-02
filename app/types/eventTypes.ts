export type EventCategory =
  | 'SPORTS'
  | 'MUSIC'
  | 'EDUCATION'
  | 'BUSINESS'
  | 'TECH'
  | 'ART'
  | 'GAMING'
  | 'OTHER'
export type EventVisibility = 'OPEN' | 'PRIVATE' | 'CLOSED'
// export type EventStatus =
//   | 'OPEN_FOR_APPLICATIONS'
//   | 'CLOSED_FOR_APPLICATIONS'
//   | 'COMPLETED'

export interface Event {
  id: number
  title: string
  description?: string
  image?: string
  points?: number
  category: EventCategory
  startTime?: string // DateTime краще передавати у форматі ISO string
  endTime?: string
  isOnline: boolean

  address?: string
  city?: string
  country?: string
  latitude?: number
  longitude?: number

  visibility: EventVisibility
  maxParticipants?: number
  organizerId: number

  // organizer: User; // Тип User має бути описаний окремо
  // members: EventUser[];
  // applications: Application[];
  // tasks: Task[];
  // messages: Message[];

  // status: EventStatus

  createdAt: string
  updatedAt: string
}

export interface Location {
  address: string
  city: string
  country: string
  latitude: number
  longitude: number
}
