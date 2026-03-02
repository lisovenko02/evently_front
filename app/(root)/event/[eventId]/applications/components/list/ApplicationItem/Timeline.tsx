import { formatDistanceToNow } from 'date-fns'

import { TimelineProps } from '../../../types/applicationsComponents.types'

const Timeline = ({ item }: TimelineProps) => {
  const createdAgo = formatDistanceToNow(new Date(item.createdAt), {
    addSuffix: true,
  })
  const decidedAgo = !['PENDING'].includes(item.applicationStatus)
    ? formatDistanceToNow(new Date(item.updatedAt), { addSuffix: true })
    : null

  return (
    <div className="flex items-end flex-col text-xs text-gray-500 border-t border-gray-800 pt-2 gap-1">
      <span>
        {item.type === 'INVITE' ? 'Invited' : 'Requested'} {createdAgo}
      </span>
      {decidedAgo && <span>Decided {decidedAgo}</span>}
    </div>
  )
}

export default Timeline
