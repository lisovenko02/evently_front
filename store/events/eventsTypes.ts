import { EventCategory, EventVisibility } from '@/app/types/eventTypes'
import {
  EventUserRoles,
  IEventMemberWithMinimalUser,
  IEventMemberWithUser,
} from '../event-user/eventUserTypes'
import { IUserMinimal } from '../auth/authTypes'

export type EventLocation = {
  city: string
  country: string
  address: string
  coords: {
    lng: string
    lat: string
  }
}

export interface IContextPermissions {
  canJoin: boolean
  canApply: boolean
  canEdit: boolean
  canManage: boolean
}

export interface IEvent {
  id: number
  title: string
  description: string | null
  image: string
  visibility: EventVisibility
  category: EventCategory
  points: number | null
  startTime: string | null
  endTime: string | null
  isOnline: boolean
  location: EventLocation | null
  maxParticipants: number | null

  organizer: IUserMinimal

  membersCount: number
}

export interface IUserEvent {
  id: number
  title: string
  image: string
  points: number | null
  category: EventCategory
  maxParticipants: number | null
  isOnline: boolean
  membersCount: number
  role: EventUserRoles
}

export interface IEventContext {
  isAuthenticated: boolean
  isMember: boolean
  role: EventUserRoles | null
  visibility: EventVisibility

  hasInvited: boolean
  hasRequested: boolean
  applicationId: number | null

  permissions: IContextPermissions
}
export interface IEventMembersRequest {
  eventId: number
  full?: boolean
}

export type IEventMembersResponse =
  | IEventMemberWithUser[]
  | IEventMemberWithMinimalUser[]

export interface IEventsStore {
  events: Event[]
  currentEvent: Event | null
  setEvents: (events: Event[]) => void
  setCurrentEvent: (event: Event) => void
}
