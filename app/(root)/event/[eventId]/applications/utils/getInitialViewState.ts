import { EventVisibility } from '@/app/types/eventTypes'
import { ApplicationsViewState } from '@/store/applications/applicationsTypes'
import { EventUserRoles } from '@/store/event-user/eventUserTypes'

export const getInitialViewState = (
  visibility: EventVisibility,
  role: EventUserRoles,
): ApplicationsViewState => {
  switch (visibility) {
    case 'OPEN':
      return { group: 'ALL' }

    case 'CLOSED':
      if (role === 'ORGANIZER' || role === 'MODERATOR') {
        return { group: 'ACTIVE', activeType: 'REQUEST' }
      }
      return { group: 'ALL' }

    case 'PRIVATE':
      if (role === 'ORGANIZER' || role === 'MODERATOR') {
        return { group: 'ACTIVE', activeType: 'INVITE' }
      }
      return { group: 'ALL' }

    default:
      return { group: 'ALL' }
  }
}
