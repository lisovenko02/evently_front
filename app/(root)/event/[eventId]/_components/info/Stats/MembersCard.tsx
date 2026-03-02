import { FaUsers } from 'react-icons/fa'
import { MembersCardProps } from '../../../_types/eventComponents.types'

const MembersCard = ({ event }: MembersCardProps) => (
  <div className="bg-accent-gray2 rounded-xl p-2 flex items-center gap-2">
    <FaUsers size={16} className="text-primary" />
    <div className="flex gap-1">
      <span className="text-ms font-semibold">{event.membersCount}</span>
      {event.maxParticipants && (
        <span className="text-xs text-text-gray">
          / {event.maxParticipants}
        </span>
      )}
      <span className="text-ms font-semibold">members</span>
    </div>
  </div>
)

export default MembersCard
