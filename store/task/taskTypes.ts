import {
  IEventMember,
  IEventMemberWithUser,
} from '../event-user/eventUserTypes'

export interface ITask {
  id: number
  title: string
  description: string | null
  priority: PriorityType
  points: number | null
  dueDate: string | null

  columnId: number

  creator: IEventMemberWithUser
  creatorId: number

  assignees: IAssignee[]
  comments: ITaskCommentWithUser[]

  createdAt: string
  updatedAt: string
}

export interface IAssignee {
  id: number
  taskId: number

  assignee: IEventMemberWithUser
  assigneeId: number

  assignedBy: IEventMemberWithUser | null
  assignedById: number | null

  assignedAt: string
}

export interface ITaskCommentBase {
  id: number
  content: string
  taskId: number
  authorId: number
  createdAt: string
}

export interface ITaskComment extends ITaskCommentBase {
  author: IEventMember
}

export interface ITaskCommentWithUser extends ITaskCommentBase {
  author: IEventMemberWithUser
}

// API

export interface ITaskResponse {
  id: number
  title: string
  description: string | null
  priority: PriorityType
  points: number | null
  dueDate: string | null
  columnId: number
  creatorId: number

  createdAt: string
  updatedAt: string
}

export interface IEventAndTaskRequest {
  eventId: number
  taskId: number
}

export interface ICreateData {
  title: string
  description?: string
  priority?: PriorityType
  points?: number
  dueDate?: string
  columnId: number
}

export interface ICreateRequest {
  data: ICreateData
  eventId: number
}

export interface IUpdateRequest {
  data: {
    title?: string
    description?: string
    priority?: PriorityType
    dueDate?: string
  }
  eventId: number
  taskId: number
}

export interface IMoveTaskRequest {
  newColumnId: number
  eventId: number
  taskId: number
}

export interface IAssignTaskResponse {
  id: number
  taskId: number

  assigneeId: number
  assignee: IEventMemberWithUser

  assignedById: number
  assignedBy: IEventMemberWithUser

  assignedAt: string
}

export interface IAssignTaskRequest {
  assigneeId: number
  eventId: number
  taskId: number
}

export interface ISelfAssignResponse {
  id: number
  taskId: number

  assigneeId: number
  assignee: IEventMemberWithUser

  assignedById: null
  assignedBy: null

  assignedAt: string
}

export interface ICreateCommentRequest {
  taskId: number
  eventId: number
  content: string
}

export interface IDeleteCommentRequest {
  eventId: number
  commentId: number
}

export type PriorityType = 'LOW' | 'MEDIUM' | 'HIGH'

// STORE

export interface ITaskStore {
  activeTask: ITask | null
  setActiveTask: (task: ITask | null) => void
}
