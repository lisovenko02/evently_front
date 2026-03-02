import { IMessage } from '@/store/messages/messagesTypes'
import { Socket } from 'socket.io-client'

export type ServerToClientEvents = {
  newMessage: (message: IMessage) => void
  'chat:updated': (data: { chatId: number; lastMessage: IMessage }) => void
}

export type ClientToServerEvents = {
  joinUserRoom: (data: { userId: number }) => void
  joinChat: (data: { chatId: number }) => void
  leaveChat: (data: { chatId: number }) => void
  createMessage: (data: {
    content: string
    attachments: INewAttachment[] | null
    eventId: number
    chatId: number
  }) => void
  getMessages: (
    payload: { chatId: number; eventId: number },
    callback: (messages: IMessage[]) => void,
  ) => void
}

export type TypedSocket = Socket<ServerToClientEvents, ClientToServerEvents>

export interface IChatUpdated {
  chatId: number
  lastMessage: IMessage
}

// potom check mb po drygomy
export interface INewAttachment {
  id: number
  fileUrl: string
  fileName: string
  messageId: number
  createdAt: string
}
