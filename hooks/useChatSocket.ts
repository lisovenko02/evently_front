import { useSocket } from '@/contexts/SocketContext'
import { useChatStore } from '@/store/chat/chatStore'
import { useMessageStore } from '@/store/messages/messagesStore'
import { IMessage } from '@/store/messages/messagesTypes'
import { useEffect } from 'react'

export const useChatSocket = ({
  chatId,
  eventId,
}: {
  chatId: number
  eventId: number
}) => {
  const { socket, isReady } = useSocket()

  useEffect(() => {
    if (!isReady || !socket || isNaN(chatId) || !chatId) return

    const messageState = useMessageStore.getState()
    const chatState = useChatStore.getState()

    if (messageState.hasLoaded?.[chatId]) return

    const handleNewMessage = (message: IMessage) => {
      if (message.chatId === chatId) {
        messageState.addMessage(chatId, message)
      }
      console.log('messageCHATSOCKET', message)
      chatState.setLastMessage(message.chatId, message)
    }

    socket.emit('joinChat', { chatId })

    socket.emit('getMessages', { chatId, eventId }, (messages: IMessage[]) => {
      messageState.setMessages(chatId, messages)

      if (messages.length) {
        chatState.setLastMessage(chatId, messages[messages.length - 1])
      }
    })

    socket.on('newMessage', handleNewMessage)
    return () => {
      socket.emit('leaveChat', { chatId })
      socket.off('newMessage', handleNewMessage)
    }
  }, [socket, isReady, chatId])
}
