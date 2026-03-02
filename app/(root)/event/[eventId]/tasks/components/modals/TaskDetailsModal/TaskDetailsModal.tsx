import Modal from '@/components/ui/Modal'
import { useTaskStore } from '@/store/task/taskStore'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import TaskDescription from './components/TaskDescription'
import TaskDueDate from './components/TaskDueDate'
import TaskCreator from './components/TaskCreator'
import CommentsSection from './components/CommentsSection'
import TaskEditSection from './components/TaskEditSection'
import TaskHeader from './components/TaskHeader/TaskHeader'
import { PriorityType } from '@/store/task/taskTypes'
import { IEventMemberWithUser } from '@/store/event-user/eventUserTypes'
import { TaskDetailsModalProps } from '../../../types/taskComponents.types'

const TaskDetailsModal = ({
  task: initialTask,
  isOpen,
  onClose,
  refetch,
}: TaskDetailsModalProps) => {
  const { eventId } = useParams()

  const { activeTask } = useTaskStore()
  const task = activeTask || initialTask

  const [isEditing, setIsEditing] = useState(false)

  // Helper functions
  const getPriorityLabel = (priority: PriorityType) => {
    switch (priority) {
      case 'HIGH':
        return 'High Priority'
      case 'MEDIUM':
        return 'Medium Priority'
      case 'LOW':
        return 'Low Priority'
      default:
        return priority
    }
  }

  const getUserName = (eventUser: IEventMemberWithUser) => {
    return eventUser?.user ? eventUser.user.username : 'Unknown User'
  }

  const getUserAvatar = (eventUser: IEventMemberWithUser) => {
    return eventUser?.user?.avatar || '/default-avatar.png'
  }

  return (
    <Modal
      show={isOpen}
      onClose={onClose}
      size="lg"
      className="flex flex-col max-h-[90vh]"
    >
      <div className="overflow-y-auto mt-4">
        <TaskHeader
          task={task}
          getPriorityLabel={getPriorityLabel}
          getUserName={getUserName}
          getUserAvatar={getUserAvatar}
          onDetailsClose={onClose}
          refetch={refetch}
          onEdit={() => setIsEditing(true)}
        />

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TaskDescription description={task.description} />
            <TaskDueDate dueDate={task.dueDate} />
            <TaskCreator
              creator={task.creator}
              createdAt={task.createdAt}
              getUserName={getUserName}
              getUserAvatar={getUserAvatar}
            />
          </div>

          <CommentsSection
            task={task}
            eventId={Number(eventId)}
            getUserName={getUserName}
          />
        </div>
      </div>

      {/* Edit modal now manages its own state */}
      <TaskEditSection
        task={task}
        eventId={Number(eventId)}
        isOpen={isEditing}
        onClose={() => {
          setIsEditing(false)
          onClose()
        }}
        refetch={refetch}
      />
    </Modal>
  )
}

export default TaskDetailsModal
