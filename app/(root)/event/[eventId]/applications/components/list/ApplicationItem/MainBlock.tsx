import { MainBlockProps } from '../../../types/applicationsComponents.types'
import Actor from './Actor'

const MainBlock = ({ item }: MainBlockProps) => {
  const invitedBy = item.type === 'INVITE' ? item.sender : null
  const isInviteFromStaff = item.type === 'INVITE'

  return (
    <div className="flex flex-col gap-2 text-sm text-gray-300">
      {item.type === 'REQUEST' && (
        <span className="text-gray-400">requested to join this event</span>
      )}

      {invitedBy && (
        <div className="flex items-center gap-2 text-gray-400 flex-wrap">
          <span>Invited by</span>
          <Actor
            user={invitedBy}
            subtle
            badge={isInviteFromStaff ? 'Staff' : undefined}
          />
        </div>
      )}
    </div>
  )
}

export default MainBlock
