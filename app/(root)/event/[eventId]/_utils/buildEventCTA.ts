import { IEventContext } from '@/store/events/eventsTypes'
import { CTAAction, CTAVariant } from '../_types/eventComponents.types'

export const buildEventCTA = (context: IEventContext) => {
  if (!context) return null

  const {
    hasInvited,
    hasRequested,
    isAuthenticated,
    isMember,
    permissions,
    role,
    visibility,
  } = context

  if (role === 'ORGANIZER') {
    return {
      label: 'Edit Event',
      disabled: false,
      variant: 'secondary' as CTAVariant,
      action: 'editEvent' as CTAAction,
    }
  }

  if (isMember) {
    return {
      label: 'Already joined',
      disabled: true,
      variant: ' disabled' as CTAVariant,
      action: null,
    }
  }

  if (!isAuthenticated) {
    if (visibility === 'PRIVATE') return null

    return {
      label: visibility === 'OPEN' ? 'Join' : 'Apply',
      disabled: false,
      variant: 'primary' as CTAVariant,
      action: 'loginRequired' as CTAAction,
    }
  }

  if (permissions.canJoin) {
    return {
      label: 'Join',
      disabled: false,
      variant: 'primary' as CTAVariant,
      action: 'joinOpen' as CTAAction,
    }
  }

  //   CLOSED
  if (visibility === 'CLOSED') {
    if (hasRequested) {
      return {
        label: 'Pending Approval',
        disabled: true,
        variant: 'disabled' as CTAVariant,
        action: null,
      }
    }

    if (permissions.canApply) {
      return {
        label: 'Apply',
        disabled: false,
        variant: 'primary' as CTAVariant,
        action: 'requestApplication' as CTAAction,
      }
    }
  }

  //   PRIVATE
  if (visibility === 'PRIVATE' && hasInvited) {
    return {
      label: 'Accept invite',
      disabled: false,
      variant: 'secondary' as CTAVariant,
      action: 'acceptInvite' as CTAAction,
    }
  }

  return null
}
