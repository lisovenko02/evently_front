import React from 'react'
import ChatListItem from './ChatListItem'
import { ChatsDataProp } from '../types'

const ChatList = ({ chats }: ChatsDataProp) => {
  return (
    <ul>
      {chats.map((chat) => (
        <ChatListItem key={chat.id} chat={chat} />
      ))}
    </ul>
  )
}

export default ChatList
