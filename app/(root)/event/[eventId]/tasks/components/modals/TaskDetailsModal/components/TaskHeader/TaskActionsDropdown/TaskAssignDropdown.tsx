import Image from 'next/image'
import { DropdownItem } from '@/components/ui/DropdownMenu'
import { IUserResponse } from '@/store/auth/authTypes'
import { TaskAssignDropdownProps } from '@/app/(root)/event/[eventId]/tasks/types/taskComponents.types'

const TaskAssignDropdown = ({
  availableUsers,
  onUserAssign,
  getUserName,
}: TaskAssignDropdownProps) => {
  const renderUserAvatar = (user: IUserResponse) =>
    user.avatar ? (
      <div className="relative w-6 h-6 rounded-full mr-2 overflow-hidden">
        <Image
          src={user.avatar}
          alt={`${user.username}'s avatar`}
          width={24}
          height={24}
          className="object-cover"
        />
      </div>
    ) : (
      <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center mr-2">
        <span className="text-xs text-white">
          {user.username?.charAt(0)?.toUpperCase()}
        </span>
      </div>
    )

  return (
    <div className="w-48 bg-dark border-darker rounded-md shadow-lg">
      {availableUsers.map((eventUser) => {
        console.log('eventUser', eventUser)
        return (
          <DropdownItem
            key={eventUser.id}
            onClick={() => onUserAssign(eventUser.user.id)}
            className="!px-3 !py-1.5"
          >
            <div className="flex items-center">
              {renderUserAvatar(eventUser.user)}
              <span className="truncate ml-2">{getUserName(eventUser)}</span>
            </div>
          </DropdownItem>
        )
      })}
    </div>
  )
}

export default TaskAssignDropdown
