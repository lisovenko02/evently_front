'use client'

import { useSocket } from '@/contexts/SocketContext'
import { useChatSocket } from '@/hooks/useChatSocket'
import { useAuthStore } from '@/store/auth/authStore'
import { useGetChatDetailsQuery } from '@/store/chat/chatApi'
import { useMessageStore } from '@/store/messages/messagesStore'
import { useParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import ChatInfoModal from './components/ChatInfoModal/ChatInfoModal'
import useUploadAttachments from '@/hooks/useUploadAttachments'
import ChatHeader from './components/ChatHeader'
import MessageList from './components/MessageList'
import MessageInput from './components/MessageInput'
import { IAttachment } from '@/store/messages/messagesTypes'

const ChatPage = () => {
  const { eventId, chatId } = useParams()
  const numericChatId = Number(chatId)
  const numericEventId = Number(eventId)

  const [input, setInput] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [showInfo, setShowInfo] = useState(false)

  const { user } = useAuthStore()
  const myUserId = user?.id
  const { socket } = useSocket()

  const { data: chatData } = useGetChatDetailsQuery({
    chatId: numericChatId,
    eventId: numericEventId,
  })

  useChatSocket({ chatId: numericChatId, eventId: numericEventId })

  const allMessages = useMessageStore((s) => s.messages)
  const messages = useMemo(
    () => allMessages[numericChatId] || [],
    [allMessages, numericChatId],
  )

  const { uploadAttachments } = useUploadAttachments()

  const handleSend = async () => {
    if (!input.trim() && files.length === 0) return

    let attachments: IAttachment[] = []

    if (files.length > 0) {
      attachments = await uploadAttachments(
        files,
        numericEventId,
        numericChatId,
      )
    }

    socket?.emit('createMessage', {
      content: input,
      attachments,
      eventId: numericEventId,
      chatId: numericChatId,
    })

    setInput('')
    setFiles([])
  }

  if (!chatData) return <div>Loading...</div>
  if (!socket) {
    console.error('Socket not connected')
    return
  }

  return (
    <>
      <div className="flex flex-col h-[calc(100vh-64px-48px)] p-4">
        {/* Header */}
        <div
          onClick={() => setShowInfo(true)}
          className="h-[80px] flex-shrink-0"
        >
          <ChatHeader chatData={chatData} />
        </div>

        {/* Message List */}
        <div className="flex-grow overflow-y-auto">
          {messages.length === 0 ? (
            <div className="space-y-2 overflow-y-auto border p-2 rounded h-full flex items-center justify-center text-gray-500">
              No messages yet
            </div>
          ) : (
            <MessageList
              messages={messages}
              myUserId={myUserId}
              chatType={chatData.type}
            />
          )}
        </div>

        {/* Input */}
        <div className="h-[64px] flex-shrink-0 mt-4">
          <MessageInput
            input={input}
            onInputChange={setInput}
            onSend={handleSend}
            onFilesChange={setFiles}
            files={files}
          />
        </div>
      </div>

      {/* Modal */}
      <ChatInfoModal
        show={showInfo}
        onClose={() => setShowInfo(false)}
        chatData={chatData}
      />
    </>
  )
}

export default ChatPage
