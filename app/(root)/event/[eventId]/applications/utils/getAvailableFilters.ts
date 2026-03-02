import { EventVisibility } from '@/app/types/eventTypes'
import { FilterConfig } from '@/store/applications/applicationsTypes'
import { EventUserRoles } from '@/store/event-user/eventUserTypes'

export const getAvailableFilters = (
  visibility: EventVisibility,
  role: EventUserRoles,
): FilterConfig[] => {
  switch (visibility) {
    case 'OPEN':
      return [{ group: 'ALL' }]

    case 'CLOSED':
      if (role === 'ORGANIZER' || role === 'MODERATOR') {
        // STAFF
        return [
          { group: 'ACTIVE', subFilters: ['REQUEST', 'INVITE'] },
          { group: 'RESOLVED' },
          { group: 'ALL' },
        ]
      }

      // USER / INVITED
      return [
        { group: 'ALL' },
        { group: 'RESOLVED' },
        { group: 'ACTIVE', subFilters: ['REQUEST', 'INVITE'] },
      ]

    case 'PRIVATE':
      if (role === 'ORGANIZER' || role === 'MODERATOR') {
        return [
          { group: 'ACTIVE', subFilters: ['REQUEST', 'INVITE'] },
          { group: 'RESOLVED' },
          { group: 'ALL' },
        ]
      }

      return [
        { group: 'ALL' },
        { group: 'RESOLVED' },
        { group: 'ACTIVE', subFilters: ['INVITE'] },
      ]

    default:
      return [{ group: 'ALL' }]
  }
}
