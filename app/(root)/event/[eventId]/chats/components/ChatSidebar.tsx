import Button from '@/components/ui/Button'
import React from 'react'
import ChatList from './ChatList'
import { ChatsDataProp } from '../types'

const ChatSidebar = ({ chats }: ChatsDataProp) => {
  return (
    <aside className="border-r border-t border-gray-700 flex flex-col max-h-screen">
      {/* Header sidebar */}
      <div className="flex justify-between items-center">
        <div className="p-4 text-light text-xl font-semibold">Chats</div>
        <div className="mr-2">
          <Button
            type="submit"
            label="Create"
            variant="secondary"
            size="small"
          />
        </div>
      </div>

      {/* Chat list */}
      <div className="overflow-y-auto" style={{ flex: 1 }}>
        <ChatList chats={chats} />
      </div>
    </aside>
  )
}

export default ChatSidebar
