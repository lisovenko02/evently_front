import { IUserMinimal } from '../auth/authTypes'
import { IEvent } from '../events/eventsTypes'

/* ======================================================
 * ENUMS
 * ====================================================== */

export type ApplicationType = 'REQUEST' | 'INVITE'
export type ApplicationStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED'
export type ApplicationDecisionStatus = 'ACCEPTED' | 'REJECTED'

export type RejectSource = 'STAFF' | 'SYSTEM'
export type SystemRejectReason = 'CHANGED_VISIBILITY' | 'EVENT_IS_OVER'

export type ApplicationView = 'NEEDS_ACTION' | 'INVITES' | 'RESOLVED' | 'ALL'

export type ActiveFilter = 'REQUEST' | 'INVITE'

export type ApplicationsViewState =
  | {
      group: 'ACTIVE'
      activeType: ActiveFilter
    }
  | {
      group: 'RESOLVED'
    }
  | {
      group: 'ALL'
    }

export type FilterConfig =
  | {
      group: 'ACTIVE'
      subFilters: ActiveFilter[]
    }
  | {
      group: 'RESOLVED'
    }
  | {
      group: 'ALL'
    }

/* ======================================================
 * BASE INTERFACES
 * ====================================================== */

export interface IEventApplication {
  id: number
  eventId: number

  senderId: number
  senderComment: string | null

  receiverId: number | null

  decisionById: number | null
  decisionByComment: string | null

  type: ApplicationType
  applicationStatus: ApplicationStatus

  rejectSource: RejectSource | null
  systemRejectReason: SystemRejectReason | null

  createdAt: string
  updatedAt: string
}

// potom smena
export interface IEventApplicationWithEvent extends IEventApplication {
  event: IEvent
}

export interface ICreatedApplication {
  id: number
  eventId: number

  senderId: number
  senderComment: string | null

  receiverId: number | null

  type: ApplicationType
  applicationStatus: 'PENDING'

  createdAt: string
  updatedAt: string
}

export interface IEventApplicationWithUsers extends IEventApplication {
  sender: IUserMinimal
  decisionBy: IUserMinimal | null
  receiver: IUserMinimal | null
}

export interface IApplicationsCount {
  active: number
  invite: number
  request: number
  resolved: number
  all: number
}

/* ======================================================
 * RESPONSE MODELS (API → FRONTEND)
 * ====================================================== */

export interface IEventApplicationsResponse {
  applications: IEventApplicationWithUsers[]
  counts: IApplicationsCount
  nextCursor: number | null
}

export interface IApplicationInviteResponse {
  id: number
  eventId: number
  status: 'PENDING'
  senderComment: string | null
  sender: IUserMinimal
  createdAt: string
}

export interface IPerformer {
  user: IUserMinimal
  actions: number
  totalActions: number
}

export interface IEventApplicationsMetrics {
  bestInviter: IPerformer | null
  topApprover: IPerformer | null
}

/* ======================================================
 * REQUEST MODELS (FRONTEND → API)
 * ====================================================== */

export interface IEventApplicationsParams {
  view?: ApplicationView
  from?: string // ISO date
  to?: string // ISO date
  limit?: number
  cursor?: number
}

export interface IUpdateStatusData {
  decisionByComment: string | null
  status: ApplicationDecisionStatus
}

export interface ICreateApplicationData {
  type: ApplicationType
  comment: string | null
  receiverId?: number
}

export interface IEventApplicationsRequest {
  eventId: number
  params: IEventApplicationsParams
}

export interface IUpdateApplicationStatusRequest {
  applicationId: number
  eventId: number
  data: IUpdateStatusData
}

export interface ICreateApplicationRequest {
  eventId: number
  data: ICreateApplicationData
}
