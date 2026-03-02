import { EventVisibility } from '@/app/types/eventTypes'
import {
  ApplicationsViewState,
  IApplicationsCount,
  IEventApplicationsMetrics,
  IEventApplicationWithUsers,
} from '@/store/applications/applicationsTypes'
import { IUserMinimal } from '@/store/auth/authTypes'
import { EventUserRoles } from '@/store/event-user/eventUserTypes'

/* ======================================================
 * HELPERS
 * ====================================================== */

export type DecisionType = 'ACCEPTED' | 'REJECTED' | null

/* ======================================================
 * Components Props
 * ====================================================== */

export type ViewFilterProps = {
  value: ApplicationsViewState
  onChange: (next: ApplicationsViewState) => void
  visibility: EventVisibility
  role: EventUserRoles
  counts?: IApplicationsCount
}

export type ApplicationListProps = {
  applications: IEventApplicationWithUsers[]
  role: EventUserRoles
  eventId: number
}

export type MetricsSectionProps = {
  metrics: IEventApplicationsMetrics
}

/* ======================================================
 * APPLICATION ITEM Components Props
 * ====================================================== */

export type ApplicationItemProps = {
  item: IEventApplicationWithUsers
  role: EventUserRoles
  eventId: number
}

export type HeaderProps = {
  item: IEventApplicationWithUsers
}

export type MainBlockProps = {
  item: IEventApplicationWithUsers
}

export type DecisionBlockProps = {
  item: IEventApplicationWithUsers
}

export type TimelineProps = {
  item: IEventApplicationWithUsers
}

export type SenderCommentProps = {
  comment?: string | null
}

export type ActionsProps = {
  applicationId: number
  eventId: number
}

export type ActorProps = {
  user: IUserMinimal
  subtle?: boolean
  badge?: string
}
