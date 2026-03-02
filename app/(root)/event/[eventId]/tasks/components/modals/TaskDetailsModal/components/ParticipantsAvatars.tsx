import Image from 'next/image'
import { ParticipantsAvatarsProps } from '../../../../types/taskComponents.types'

const MAX_VISIBLE_ASSIGNEES = 2

const ParticipantsAvatars = ({
  assignees,
  getUserName,
  getUserAvatar,
}: ParticipantsAvatarsProps) => {
  return (
    <div className="flex flex-col items-end">
      <div className="flex -space-x-2">
        {assignees.slice(0, MAX_VISIBLE_ASSIGNEES).map((assignee) => (
          <div
            key={assignee.id}
            className="relative h-8 w-8 rounded-full bg-gray-600 border-2 border-dark-800 overflow-hidden hover:z-10 hover:scale-110 transition-transform cursor-pointer"
            title={getUserName(assignee.assignee)}
          >
            {/* potom profile */}
            {getUserAvatar(assignee.assignee) ? (
              <Image
                src={getUserAvatar(assignee.assignee)}
                alt={getUserName(assignee.assignee)}
                width={32}
                height={32}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-white font-medium text-xs flex items-center justify-center h-full">
                {getUserName(assignee.assignee).charAt(0)}
              </span>
            )}
          </div>
        ))}
        {assignees.length > MAX_VISIBLE_ASSIGNEES && (
          <div className="relative h-8 w-8 rounded-full bg-gray-700 border-2 border-dark-800 flex items-center justify-center text-xs text-gray-300">
            +{assignees.length - MAX_VISIBLE_ASSIGNEES}
          </div>
        )}
      </div>
    </div>
  )
}

export default ParticipantsAvatars
