import { IChatParticipant } from '../chat/chatTypes'

export interface IAttachment {
  id: number
  fileUrl: string
  fileName: string
  messageId: number
  createdAt: string
}

export interface IMessage {
  id: number
  content: string
  chatId: number
  senderId: number
  createdAt: string
  updatedAt: string

  attachments: IAttachment[]
  sender: IChatParticipant
}

export interface IUploadMessageFilesResponse {
  attachments: IAttachment[]
}

export interface IMessageStore {
  messages: Record<number, IMessage[]>
  hasLoaded: { [chatId: number]: boolean }
  addMessage: (chatId: number, message: IMessage) => void
  setMessages: (chatId: number, messages: IMessage[]) => void
}
