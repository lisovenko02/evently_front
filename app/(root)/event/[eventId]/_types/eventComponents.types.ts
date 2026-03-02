import { EventCategory, EventVisibility } from '@/app/types/eventTypes'
import { IUserMinimal } from '@/store/auth/authTypes'
import { EventLocation, IEvent } from '@/store/events/eventsTypes'
import { ReactNode } from 'react'

/* ======================================================
 * HELPERS
 * ====================================================== */

export type ModalType = 'request' | 'invite' | 'edit' | null

export type CTAVariant = 'primary' | 'secondary' | 'disabled'

export type CTAAction =
  | 'joinOpen'
  | 'requestApplication'
  | 'acceptInvite'
  | 'editEvent'
  | 'loginRequired'
  | null

export type CTA = {
  label: string
  disabled: boolean
  variant: CTAVariant
  action: CTAAction
}

export type Badge = {
  key: string
  label: string
  value: string
  icon: ReactNode
  color: string
}

export type Time = {
  day: string
  month: string
  time: string
}

/* ======================================================
 * MIXED Props
 * ====================================================== */

export type ButtonCTAProps = {
  cta: CTA
  onClick: () => void
}

/* ======================================================
 * HERO SECTION Components Props
 * ====================================================== */

export type HeroSectionProps = {
  category: EventCategory
  visibility: EventVisibility
  isOnline: boolean
  image: string
  title: string
}

export type EventBadgesProps = {
  badge: Badge
}

/* ======================================================
 * INFO SECTION Components Props
 * ====================================================== */

export type InfoSectionProps = {
  event: IEvent
  cta: CTA | null
  stableLocation: EventLocation | null
  onCTA: () => void
}

export type EventHeaderProps = {
  title: string
  organizer: IUserMinimal
}

export type DescriptionCardProps = {
  description: string
}

export type MembersCardProps = {
  event: IEvent
}

export type WhenCardProps = {
  startDate: Time | null
  endDate: Time | null
}

export type WhereCardProps = {
  location: EventLocation
}

/* ======================================================
 * Modals Props
 * ====================================================== */

export type InviteModalProps = {
  applicationId: number
  eventId: number
  onClose: () => void
}

export type RequestApplicationModalProps = {
  eventId: number
  onClose: () => void
}

export type EditEventModalProps = {
  onClose: () => void
}
