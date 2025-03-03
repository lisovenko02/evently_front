export interface IEvent {
  id: number
  title: string
  description?: string
  category:
    | 'SPORTS'
    | 'MUSIC'
    | 'EDUCATION'
    | 'BUSINESS'
    | 'TECH'
    | 'ART'
    | 'GAMING'
    | 'OTHER'
  isOnline: boolean
  startTime?: string
  endTime?: string
  image?: string
  points: number
  membersLimit?: number
  organizerId: number
  createdAt: string
  updatedAt: string
  eventStatus: 'OPEN_FOR_APPLICATIONS' | 'CLOSED_FOR_APPLICATIONS' | 'COMPLETED'

  city?: string
  country?: string
  latitude?: number
  longitude?: number

  members?: IEventMember[]
}

export interface IEventMember {
  userId: number
  eventId: number
  role: 'ORGANIZER' | 'PARTICIPANT'
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
}

export interface IEventsState {
  events: IEvent[]
  currentEvent: IEvent | null
}

export interface IEventsActions {
  setEvents: (events: IEvent[]) => void
  setCurrentEvent: (event: IEvent | null) => void
  addEvent: (event: IEvent) => void
}
