import { useEffect, useState } from 'react'
import {
  useAssignTaskMutation,
  useSelfAssignTaskMutation,
} from '@/store/task/taskApi'
import toast from 'react-hot-toast'
import { ITask } from '@/store/task/taskTypes'
import { IUserResponse } from '@/store/auth/authTypes'
import { showErrorToast } from '@/utils/showErrorToast'
import { IEventMemberWithUser } from '@/store/event-user/eventUserTypes'
import { ParticipantsState } from '../types/taskComponents.types'

interface UseTaskAssignmentProps {
  task: ITask
  user: IUserResponse | null
  members: IEventMemberWithUser[] | undefined
  eventId: number
}

export const useTaskAssignment = ({
  task,
  user,
  members,
  eventId,
}: UseTaskAssignmentProps) => {
  const [isSelfAssigned, setIsSelfAssigned] = useState(false)
  const [participants, setParticipants] = useState<ParticipantsState>({
    available: [],
    assigned: [],
  })

  const [assignTaskMutation] = useAssignTaskMutation()
  const [selfAssignTaskMutation] = useSelfAssignTaskMutation()

  useEffect(() => {
    if (!members || !task.assignees) return

    const assignedUserIds = task.assignees.map((a) => a.assignee.user.id)
    const currentUserAssigned = user?.id
      ? assignedUserIds.includes(user.id)
      : false

    setParticipants({
      assigned: task.assignees,
      available: members.filter(
        (member) => !assignedUserIds.includes(member.user.id),
      ),
    })

    setIsSelfAssigned(currentUserAssigned)
  }, [members, task.assignees, user?.id])

  const handleSelfAssign = async () => {
    if (!user?.id) return

    try {
      const result = await selfAssignTaskMutation({
        eventId,
        taskId: task.id,
      }).unwrap()

      setParticipants((prev) => ({
        assigned: [...prev.assigned, result],
        available: prev.available.filter((u) => u.user.id !== user.id),
      }))

      setIsSelfAssigned(true)
      toast.success('Assignment successful!')
    } catch (error) {
      showErrorToast(error)
    }
  }

  const handleUserAssign = async (userId: number) => {
    try {
      const result = await assignTaskMutation({
        eventId,
        taskId: task.id,
        assigneeId: userId,
      }).unwrap()

      setParticipants((prev) => ({
        assigned: [...prev.assigned, result],
        available: prev.available.filter((u) => u.user.id !== userId),
      }))

      if (userId === user?.id) {
        setIsSelfAssigned(true)
      }

      toast.success('Assignment successful!')
    } catch (error) {
      showErrorToast(error)
    }
  }

  return {
    participants,
    isSelfAssigned,
    handleUserAssign,
    handleSelfAssign,
  }
}
