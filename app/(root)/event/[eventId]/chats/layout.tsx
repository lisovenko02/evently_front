'use client'

import { useChatUpdates } from '@/hooks/useChatUpdates'
import { useGetUserChatsQuery } from '@/store/chat/chatApi'
import { useChatStore } from '@/store/chat/chatStore'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import ChatSidebar from './components/ChatSidebar'
import { useMediaQuery } from 'react-responsive'

export default function ChatsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { eventId } = useParams()

  const { data: chats } = useGetUserChatsQuery(Number(eventId))

  const lastMessages = useChatStore((state) => state.lastMessages)

  useChatUpdates()

  const isDesktop = useMediaQuery({ minWidth: 768 })

  const mergedChats = useMemo(() => {
    return chats?.map((chat) => {
      const updatedLastMessage = lastMessages.find(
        (msg) => msg.chatId === chat.id,
      )?.message

      return { ...chat, lastMessage: updatedLastMessage || chat.lastMessage }
    })
  }, [chats, lastMessages])

  return (
    <div className="flex h-full">
      {isDesktop && (
        <div className="w-[300px]">
          <ChatSidebar chats={mergedChats || []} />
        </div>
      )}

      <main className="flex-1 border-t border-gray-700">{children}</main>
    </div>
  )
}
