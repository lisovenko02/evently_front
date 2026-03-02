import { IColumn } from '@/store/column/columnTypes'
import { IEventMemberWithUser } from '@/store/event-user/eventUserTypes'
import {
  IAssignee,
  ITask,
  ITaskCommentWithUser,
  PriorityType,
} from '@/store/task/taskTypes'
import { FormValues } from '@/utils/formSchemas/createTaskSchema'

export type BackgroundSelectorProps = {
  backgrounds: string[]
  currentBackground: string | null
  onSelect: (bg: string | null) => void
}

export type ColumnProps = {
  column: IColumn
  onUpdateTitle: (columnId: number, newTitle: string) => Promise<void>
  onDelete: (columnId: number) => Promise<void>
  refetch: () => void
}

export type TaskCardProps = {
  task: ITask
  refetch: () => void
}

export type AddColumnFormProps = {
  isCreating: boolean
  title: string
  onTitleChange: (title: string) => void
  onSubmit: () => void
  onCancel: () => void
  inputRef: React.RefObject<HTMLInputElement | null>
}

export type CreateTaskFormProps = {
  onSubmit: (data: FormValues) => Promise<void> | void
  isLoading: boolean
}

export type CommentInputProps = {
  task: ITask
  eventId: number
}

export type CommentItemProps = {
  comment: ITaskCommentWithUser
  getUserName: (eventUser: IEventMemberWithUser) => string
}

export type CommentsSectionProps = {
  task: ITask
  eventId: number
  getUserName: (eventUser: IEventMemberWithUser) => string
}

export type ParticipantsAvatarsProps = {
  assignees: IAssignee[]
  getUserName: (eventUser: IEventMemberWithUser) => string
  getUserAvatar: (eventUser: IEventMemberWithUser) => string
}

export type TaskCreatorProps = {
  creator: IEventMemberWithUser
  createdAt: string
  getUserName: (eventUser: IEventMemberWithUser) => string
  getUserAvatar: (eventUser: IEventMemberWithUser) => string
}

export type TaskHeaderProps = {
  task: ITask
  getPriorityLabel: (priority: PriorityType) => string
  getUserName: (eventUser: IEventMemberWithUser) => string
  getUserAvatar: (eventUser: IEventMemberWithUser) => string
  onDetailsClose: () => void
  refetch: () => void
  onEdit: () => void
}

export type TaskPriorityBadgeProps = {
  priority: PriorityType
  getPriorityLabel: (priority: PriorityType) => string
}

export type TaskDetailsModalProps = {
  task: ITask
  isOpen: boolean
  onClose: () => void
  refetch: () => void
}

export type TaskEditSectionProps = {
  task: ITask
  eventId: number
  isOpen: boolean
  onClose: () => void
  refetch: () => void
}

export type TaskDeleteModalProps = {
  task: ITask
  eventId: number
  show: boolean
  onClose: () => void
  onConfirm: () => void
  refetch: () => void
}

export interface ParticipantsState {
  available: IEventMemberWithUser[]
  assigned: IAssignee[]
}

export type TaskActionsDropdownProps = {
  participants: ParticipantsState
  onUserAssign: (userId: number) => void
  onEdit: () => void
  onDelete: () => void
  getUserName: (eventUser: IEventMemberWithUser) => string
}

export type TaskAssignDropdownProps = {
  availableUsers: IEventMemberWithUser[]
  onUserAssign: (userId: number) => void
  getUserName: (eventUser: IEventMemberWithUser) => string
}

export type TaskInfoBadgesProps = {
  task: ITask
  getPriorityLabel: (priority: PriorityType) => string
}

export type CreateTaskModalProps = {
  show: boolean
  onClose: () => void
  columnId: number
  refetch: () => void
}
