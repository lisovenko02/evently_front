import React from 'react'
import { StatusGroupKey } from '../helpers/statusHelpers'
import { IUserSimple } from '@/store/auth/authTypes'
import {
  EventUserHistoryStatus,
  IEventHistory,
  IEventHistoryMetrics,
} from '@/store/event-user-history/EUH.types'

/* ======================================================
 * HELPERS
 * ====================================================== */

type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>

/* ======================================================
 * FILTER Components Props
 * ====================================================== */

export type StatusFilterProps = {
  activeGroups: StatusGroupKey[]
  toggleGroup: (group: StatusGroupKey) => void
  selectedStatuses: EventUserHistoryStatus[]
  toggleStatus: (status: EventUserHistoryStatus) => void
}

export type DateFilterProps = {
  from: string | null
  to: string | null
  setFrom: StateSetter<string | null>
  setTo: StateSetter<string | null>
}

export type UserFilterProps = {
  eventId: number
  selectedUsers: IUserSimple[]
  setSelectedUsers: StateSetter<IUserSimple[]>
}

export type UserDropdownProps = {
  users: IUserSimple[]
  selectedUsers: IUserSimple[]
  setSelectedUsers: StateSetter<IUserSimple[]>
  isSelected: (id: number) => boolean
  clearSearch: () => void
}

export type ActiveFiltersProps = {
  selectedUsers: IUserSimple[]
  activeGroups: StatusGroupKey[]
  selectedStatuses: EventUserHistoryStatus[]
  to: string | null
  from: string | null

  setSelectedUsers: StateSetter<IUserSimple[]>
  setSelectedStatuses: StateSetter<EventUserHistoryStatus[]>
  setFrom: StateSetter<string | null>
  setTo: StateSetter<string | null>
}

/* ======================================================
 * HISTORY LIST Components Props
 * ====================================================== */
export type HistoryListProps = {
  history: IEventHistory[]
  isLoading: boolean
}

export type HistoryItemProps = {
  item: IEventHistory
}

/* ======================================================
 * METRICS Component Props
 * ====================================================== */

export type MetricsSectionProps = IEventHistoryMetrics
