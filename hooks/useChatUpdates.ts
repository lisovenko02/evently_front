import { useEffect } from 'react'
import { useChatStore } from '@/store/chat/chatStore' // приклад
import { useSocket } from '@/contexts/SocketContext'
import { IChatUpdated } from '@/app/types/socketTypes'

export const useChatUpdates = () => {
  const { socket } = useSocket()
  const setLastMessage = useChatStore((state) => state.setLastMessage)

  useEffect(() => {
    if (!socket) return

    const handleChatUpdated = ({ chatId, lastMessage }: IChatUpdated) => {
      setLastMessage(chatId, lastMessage)
      console.log('lastMessageCHATUPDATES', lastMessage)
    }
    socket.on('chat:updated', handleChatUpdated)

    return () => {
      socket.off('chat:updated', handleChatUpdated)
    }
  }, [socket])
}
