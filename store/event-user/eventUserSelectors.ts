import { EventUserRoles, IEventMember } from './eventUserTypes'

const hasRole = (eventUser: IEventMember | null, roles: EventUserRoles[]) =>
  !!eventUser && roles.includes(eventUser.role)

export const isOrganizer = (eventUser: IEventMember | null) =>
  hasRole(eventUser, ['ORGANIZER'])

export const isModerator = (eventUser: IEventMember | null) =>
  hasRole(eventUser, ['MODERATOR'])

export const isStaff = (eventUser: IEventMember | null) =>
  hasRole(eventUser, ['ORGANIZER', 'MODERATOR'])

export const canKick = (
  actorEventUser: IEventMember | null,
  targetEventUser: IEventMember
) => {
  if (!actorEventUser) return false
  if (actorEventUser.id === targetEventUser.id) return false

  if (actorEventUser.role === 'ORGANIZER') return true
  if (actorEventUser.role === 'MODERATOR' && targetEventUser.role === 'USER')
    return true

  return false
}

export const canBan = (
  actorEventUser: IEventMember | null,
  targetEventUser: IEventMember
) => {
  return canKick(actorEventUser, targetEventUser)
}

export const canChangeRole = (
  actorEventUser: IEventMember | null,
  targetEventUser: IEventMember
) => {
  if (!actorEventUser) return false
  if (actorEventUser.role !== 'ORGANIZER') return false
  if (actorEventUser.id === targetEventUser.id) return false

  return true
}

export const canLeaveEvent = (actorEventUser: IEventMember | null) => {
  if (!actorEventUser) return false
  return actorEventUser.role !== 'ORGANIZER'
}
