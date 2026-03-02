import Image from 'next/image'
import { format } from 'date-fns'
import { TaskCreatorProps } from '../../../../types/taskComponents.types'

const TaskCreator = ({
  creator,
  createdAt,
  getUserName,
  getUserAvatar,
}: TaskCreatorProps) => {
  if (!creator) return null

  return (
    <div>
      <h3 className="text-lg font-semibold text-light mb-3">Created By</h3>
      <div className="flex items-center gap-3 bg-dark-700 p-4 rounded-lg">
        <div className="h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center overflow-hidden">
          {/* potom profile */}
          {getUserAvatar(creator) ? (
            <Image
              src={getUserAvatar(creator)}
              alt={getUserName(creator)}
              width={40}
              height={40}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-white font-medium">
              {getUserName(creator).charAt(0)}
            </span>
          )}
        </div>
        <div>
          <p className="text-gray-300 font-medium">{getUserName(creator)}</p>
          <p className="text-xs text-gray-500">
            {format(new Date(createdAt), 'MMM dd, yyyy')}
          </p>
        </div>
      </div>
    </div>
  )
}

export default TaskCreator
