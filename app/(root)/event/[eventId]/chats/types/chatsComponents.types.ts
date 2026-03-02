import { ModalProps } from '@/components/ui/Modal'
import {
  ChatType,
  IChat,
  IChatDetails,
  IChatDetailsParticipant,
} from '@/store/chat/chatTypes'
import { IMessage } from '@/store/messages/messagesTypes'

export type ChatDetailsDataProp = {
  chatData: IChatDetails
}

export type ChatDataProp = {
  chat: IChat
}

export type ChatsDataProp = {
  chats: IChat[]
}

export interface ConfirmDeleteModalProps extends ModalProps {
  chatName?: string
  onConfirm: () => void
}

export interface ConfirmKickModalProps extends ModalProps {
  username: string
  onConfirm: () => void
}

export type ParticipantItemProps = {
  eventUser: IChatDetailsParticipant
  chatData: IChatDetails
  onKickClick: (user: IChatDetailsParticipant) => void
}

export type ChatInfoModalProps = {
  show: boolean
  onClose: () => void
  chatData: IChatDetails
}

export type MessageInputProps = {
  input: string
  onInputChange: (value: string) => void
  onSend: () => void
  onFilesChange: (files: File[]) => void
  files?: File[]
}

export type MessageListProps = {
  messages: IMessage[]
  chatType: ChatType
  myUserId?: number
}

export type ImageUploadProps = {
  previewImg: string | null
  onChange: (file: File) => void
}
