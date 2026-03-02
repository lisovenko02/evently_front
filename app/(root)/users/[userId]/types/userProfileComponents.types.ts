import React from 'react'

import { IUserResponse } from '@/store/auth/authTypes'
import {
  UserProfileCategoryStats,
  UserProfileMainStats,
} from '@/store/user/userTypes'
import { IUserEvent } from '@/store/events/eventsTypes'
import { UserPin } from '@/store/pins/pinsTypes'

export type ProfileSidebarProps = {
  user: IUserResponse
}

export type InviteToEventModalProps = {
  isOpen: boolean
  onClose: () => void
}

export type StatsGridProps = {
  userStats: UserProfileMainStats
  eventsSectionRef: React.RefObject<HTMLDivElement | null>
  handleOpenPinsModal: () => void
  pinsLoading: boolean
  pinsFetching: boolean
}

export type CategoryStatisticsProps = {
  categoryStats: UserProfileCategoryStats[]
}

export type EventsSectionProps = {
  userEvents: IUserEvent[]
  eventsSectionRef: React.RefObject<HTMLDivElement | null>
}

export type UserPinsModalProps = {
  isOpen: boolean
  onClose: () => void
  pins: UserPin[]
  totalOwned: number
  totalAvailable: number
}
