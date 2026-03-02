import { EventCategory } from '@/app/types/eventTypes'
import { IUserResponse } from '../auth/authTypes'
import { IUserEvent } from '../events/eventsTypes'

export type UserProfileMainStats = {
  totalPoints: number
  pinsEarned: number
  eventsCreated: number
  eventsJoined: number
}

export type UserProfileCategoryStats = {
  category: EventCategory
  count: number
  percentage: number
}

export interface IUserProfile {
  user: IUserResponse
  stats: UserProfileMainStats
  categoryStats: UserProfileCategoryStats[]
  events: IUserEvent[]
}
