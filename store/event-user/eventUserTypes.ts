import { IUserMinimal, IUserResponse } from '../auth/authTypes'

// ================= API =================
export interface IEventMember {
  id: number
  userId: number
  eventId: number
  role: EventUserRoles
  joinedAt: string
}

export interface IEventMemberWithUser extends IEventMember {
  user: IUserResponse
}

export interface IEventMemberWithMinimalUser extends IEventMember {
  user: IUserMinimal
}

export interface IEventUserActionRequest {
  eventId: number
  reason?: string
}

export interface IKickUserRequest extends IEventUserActionRequest {
  eventUserId: number
}

export interface IBanUserRequest extends IEventUserActionRequest {
  eventUserId: number
}

export interface IUnbanUserRequest extends IEventUserActionRequest {
  userId: number
}

// ================= STORE =================

export interface IEventUserStore {
  currentEventUser: IEventMember | null
  setCurrentEventUser: (eventUser: IEventMember) => void
  reset: () => void
}

// export interface IEventUserStore {
//   selectedEventUserId: number | null
//   action: EventUserActionType
//   reason: string

//   isModalOpen: boolean

//   openAction: (action: EventUserActionType, eventUserId: number | null) => void
//   closeModal: () => void
//   setReason: (value: string) => void
//   reset: () => void
// }

export type EventUserActionType = 'KICK' | 'BAN' | 'UNBAN' | 'LEAVE' | null

export type EventUserRoles = 'USER' | 'MODERATOR' | 'ORGANIZER'
