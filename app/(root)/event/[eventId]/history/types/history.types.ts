import { EventUserHistoryStatus } from '@/store/event-user-history/EUH.types'

export interface IFilters {
  userIds?: number[]
  statuses?: EventUserHistoryStatus[]
  from?: string
  to?: string
}

export interface IMemoParams {
  userIds?: number[]
  statuses?: EventUserHistoryStatus[]
  from?: string
  to?: string
}
