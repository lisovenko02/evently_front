import { IUserResponse } from '../auth/authTypes'
import { IAttachment, IMessage } from '../messages/messagesTypes'

// API
// +
export interface IChatParticipant {
  id: number
  user: IUserResponse
}

// +
export interface ILastMessage {
  id: number
  chatId: number

  content: string
  attachments: IAttachment[]

  sender: IChatParticipant
  senderId: number

  createdAt: string
  updatedAt: string
}

// +
export interface IChat {
  id: number
  type: ChatType
  name: string | null
  eventId: number
  chatImg: string | null

  creatorId: number
  creator: IChatParticipant
  isCreator: boolean

  lastMessageId: number | null
  lastMessageAt: string | null
  lastMessage: ILastMessage | null

  recipientId: number | null
  recipient: IChatParticipant | null

  createdAt: string
  updatedAt: string
}

// +
export interface IChatDetailsParticipant {
  id: number
  avatar: string | null
  role: EventUserRoleType
  username: string
}

// +
export interface ICreateParticipant {
  id: number
  chatId: number
  eventUserId: number
  joinedAt: string
}

// +
export interface IOtherParticipant {
  id: number
  username: string
  avatar: string | null
  role: EventUserRoleType
}

// +
export interface IChatDetails {
  id: number
  name: string | null
  type: ChatType
  chatImg: string | null
  eventId: number
  creatorId: number

  isCreator: boolean

  participants: IChatDetailsParticipant[]
  otherParticipant: IOtherParticipant | null
}

// +
export interface ICreateGroupChatResponse {
  id: number
  type: 'GROUP'
  name: string
  eventId: number
  chatImg: string

  creatorId: number

  lastMessageId: null
  lastMessageAt: null

  recipientId: null

  participants: ICreateParticipant[]

  createdAt: string
  updatedAt: string
}

// +
export interface ICreatePrivateChatResponse {
  id: number
  eventId: number
  type: 'PRIVATE'
  name: null
  chatImg: null

  creatorId: number
  lastMessageId: null
  lastMessageAt: null
  recipientId: number

  participants: ICreateParticipant[]

  createdAt: string
  updatedAt: string
}

// +
export interface IGroupChatResponse {
  id: number
  eventId: number
  name: string
  chatImg: string
  type: 'GROUP'

  creatorId: number
  recipientId: null

  lastMessageId: number | null
  lastMessageAt: string | null

  createdAt: string
  updatedAt: string
}

// +
export interface IGroupChatResponseWrapper {
  data: IGroupChatResponse
}

export type ChatType = 'GENERAL' | 'GROUP' | 'PRIVATE'

export type EventUserRoleType = 'USER' | 'ORGANIZER' | 'MODERATOR'

// STORE

export interface IChatStoreState {
  lastMessages: {
    chatId: number
    message: IMessage
  }[]
  setLastMessage: (chatId: number, message: IMessage) => void
}
