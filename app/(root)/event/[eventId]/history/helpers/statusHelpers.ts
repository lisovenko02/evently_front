import { EventUserHistoryStatus } from '@/store/event-user-history/EUH.types'

export const STATUS_CONFIG = {
  JOINED: {
    label: 'Joined',
    dotClass: 'bg-green-400',
    textClass: 'text-green-400',
  },
  SELF_LEFT: {
    label: 'Left',
    dotClass: 'bg-gray-400',
    textClass: 'text-gray-400',
  },
  KICKED: {
    label: 'Kicked',
    dotClass: 'bg-red-400',
    textClass: 'text-red-400',
  },
  BANNED: {
    label: 'Banned',
    dotClass: 'bg-red-500',
    textClass: 'text-red-500',
  },
  UNBANNED: {
    label: 'Unbanned',
    dotClass: 'bg-yellow-400',
    textClass: 'text-yellow-400',
  },
  ROLE_CHANGED: {
    label: 'Role changed',
    dotClass: 'bg-purple-400',
    textClass: 'text-purple-400',
  },
  DEFAULT: {
    label: 'Unknown',
    dotClass: 'bg-gray-500',
    textClass: 'text-gray-500',
  },
} as const

export const STATUS_GROUPS = {
  MEMBERSHIP: {
    label: 'Membership',
    statuses: ['JOINED', 'SELF_LEFT'] as EventUserHistoryStatus[],
  },
  MODERATION: {
    label: 'Moderation',
    statuses: ['KICKED', 'BANNED', 'UNBANNED'] as EventUserHistoryStatus[],
  },
  ROLE: {
    label: 'Roles',
    statuses: ['ROLE_CHANGED'] as EventUserHistoryStatus[],
  },
} as const

// potom check
export const KEY_MAP: Record<string, keyof typeof STATUS_CONFIG> = {
  joined: 'JOINED',
  self_left: 'SELF_LEFT',
  kicked: 'KICKED',
  banned: 'BANNED',
  unbanned: 'UNBANNED',
  role_changed: 'ROLE_CHANGED',
}

export type StatusGroupKey = keyof typeof STATUS_GROUPS
