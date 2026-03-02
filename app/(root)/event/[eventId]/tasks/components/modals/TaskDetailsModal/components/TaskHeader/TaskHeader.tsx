import Button from '@/components/ui/Button'
import TaskInfoBadges from './TaskInfoBadges'
import TaskActionsDropdown from './TaskActionsDropdown/TaskActionsDropdown'
import { useTaskAssignment } from '../../../../../hooks/useTaskAssignment'
import { useGetEventMembersQuery } from '@/store/events/eventsApi'
import { useState } from 'react'
import { useAuthStore } from '@/store/auth/authStore'
import { useParams } from 'next/navigation'
import ParticipantsAvatars from '../ParticipantsAvatars'
import TaskDeleteModal from './TaskDeleteModal'
import { IEventMemberWithUser } from '@/store/event-user/eventUserTypes'
import { TaskHeaderProps } from '../../../../../types/taskComponents.types'

const TaskHeader = ({
  task,
  getPriorityLabel,
  getUserName,
  getUserAvatar,
  refetch,
  onDetailsClose,
  onEdit,
}: TaskHeaderProps) => {
  const { eventId } = useParams()
  const { user } = useAuthStore()
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const { data: members } = useGetEventMembersQuery({
    eventId: Number(eventId),
  })

  const { participants, isSelfAssigned, handleUserAssign, handleSelfAssign } =
    useTaskAssignment({
      task,
      user,
      members: members as IEventMemberWithUser[],
      eventId: Number(eventId),
    })
  return (
    <>
      <div className="border-b border-gray-700 pb-6 bg-dark-800 pt-6 px-6">
        <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
          <div className="flex gap-2">
            <div className="flex items-center gap-1">
              <div
                className={`w-3 h-3 rounded-full ${
                  task.priority === 'HIGH'
                    ? 'bg-red-500'
                    : task.priority === 'MEDIUM'
                      ? 'bg-yellow-500'
                      : 'bg-green-500'
                }`}
              />

              <h1 className="text-2xl font-bold text-light">{task.title}</h1>
            </div>
            <TaskActionsDropdown
              participants={participants}
              onUserAssign={handleUserAssign}
              onEdit={onEdit}
              onDelete={() => setShowDeleteModal(true)}
              getUserName={getUserName}
            />
          </div>

          <div className="flex">
            {!isSelfAssigned && (
              <Button
                label="Self-Assign"
                onClick={handleSelfAssign}
                variant="primary"
                size="small"
              />
            )}
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          {/* potom skorotit */}
          <TaskInfoBadges task={task} getPriorityLabel={getPriorityLabel} />

          {participants.assigned.length > 0 && (
            <ParticipantsAvatars
              assignees={participants.assigned}
              getUserName={getUserName}
              getUserAvatar={getUserAvatar}
            />
          )}
        </div>
      </div>

      <TaskDeleteModal
        eventId={Number(eventId)}
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={onDetailsClose}
        refetch={refetch}
        task={task}
      />
    </>
  )
}

export default TaskHeader
