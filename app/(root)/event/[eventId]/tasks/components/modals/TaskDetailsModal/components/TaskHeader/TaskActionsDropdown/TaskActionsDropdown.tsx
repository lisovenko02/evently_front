import { DropdownItem, DropdownMenu } from '@/components/ui/DropdownMenu'
import { ChevronRight, Edit3, Trash2, UserRoundPlus } from 'lucide-react'
import TaskAssignDropdown from './TaskAssignDropdown'
import { TaskActionsDropdownProps } from '@/app/(root)/event/[eventId]/tasks/types/taskComponents.types'

const TaskActionsDropdown = ({
  participants,
  onUserAssign,
  onEdit,
  onDelete,
  getUserName,
}: TaskActionsDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownItem
        icon={<UserRoundPlus size={14} />}
        showSubmenu={participants.available.length > 0}
        submenuContent={
          <TaskAssignDropdown
            availableUsers={participants.available}
            onUserAssign={onUserAssign}
            getUserName={getUserName}
          />
        }
      >
        <div className="flex justify-between items-center w-full">
          <span>Assign</span>
          {participants.available.length > 0 && <ChevronRight size={16} />}
        </div>
      </DropdownItem>

      <DropdownItem onClick={onEdit} icon={<Edit3 size={14} />}>
        Edit
      </DropdownItem>

      <DropdownItem onClick={onDelete} icon={<Trash2 size={14} />} danger>
        Delete
      </DropdownItem>
    </DropdownMenu>
  )
}

export default TaskActionsDropdown
