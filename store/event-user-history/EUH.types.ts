import { IUserSimple } from '../auth/authTypes'

/* ======================================================
 * ENUMS
 * ====================================================== */

export type EventUserHistoryStatus =
  | 'JOINED'
  | 'SELF_LEFT'
  | 'KICKED'
  | 'BANNED'
  | 'UNBANNED'
  | 'ROLE_CHANGED'

/* ======================================================
 * RESPONSE MODELS (API → FRONTEND)
 * ====================================================== */

export interface IEventHistory {
  id: number
  eventId: number

  eventUserId: number | null
  userId: number
  actorUserId: number | null

  status: EventUserHistoryStatus
  reason: string | null

  user: IUserSimple
  actorUser: IUserSimple | null

  createdAt: string // ISO date
}

export interface IActivityMetrics {
  total: number
  joined: number
  self_left: number
  kicked: number
  banned: number
  unbanned: number
  role_changed: number
}

export interface ITopModeratorMetrics {
  userId: number
  username: string
  avatar: string
  actions: number
}

export interface IModerationMetrics {
  totalActions: number
  topModerator: ITopModeratorMetrics | null
}

export interface IEventHistoryMetrics {
  activity: IActivityMetrics
  moderation: IModerationMetrics | null
}

/* ======================================================
 * REQUEST MODELS (FRONTEND → API)
 * ====================================================== */

export interface IEventHistoryParams {
  userIds?: number[]
  statuses?: EventUserHistoryStatus[]
  from?: string // ISO date
  to?: string // ISO date
  limit?: number
  page?: number
}

export interface ISearchEventUserParams {
  query: string
  limit?: number
}

export interface IEventHistoryRequest {
  eventId: number
  params: IEventHistoryParams
}

export interface ISearchQueryRequest {
  eventId: number
  params: ISearchEventUserParams
}

export interface IEventUserIdsRequest {
  eventId: number
  userIds: number[]
}
