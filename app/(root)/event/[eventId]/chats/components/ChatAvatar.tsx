import Image from 'next/image'
import React from 'react'
import { ChatDataProp } from '../types'

const ChatAvatar = ({ chat }: ChatDataProp) => {
  const isPrivateChat = chat.type === 'PRIVATE'
  const recipient = isPrivateChat ? chat.recipient : null
  const creator = isPrivateChat ? chat.creator : null

  const avatar = isPrivateChat
    ? (chat.isCreator ? recipient?.user.avatar : creator?.user.avatar) ||
      '/wallpaper.jpg'
    : chat.chatImg || '/wallpaper.jpg'

  return (
    <Image
      src={avatar}
      alt={chat.name || 'Chat'}
      width={40}
      height={40}
      className="rounded-full object-cover"
    />
  )
}

export default ChatAvatar
