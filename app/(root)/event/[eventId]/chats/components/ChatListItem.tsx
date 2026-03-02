import Link from 'next/link'
import ChatAvatar from './ChatAvatar'
import ChatLastMessage from './ChatLastMessage'
import { useParams } from 'next/navigation'
import clsx from 'clsx'
import { Users } from 'lucide-react'
import { ChatDataProp } from '../types'

const ChatListItem = ({ chat }: ChatDataProp) => {
  const { eventId } = useParams()
  const isPrivateChat = chat.type === 'PRIVATE'

  const recipient = isPrivateChat ? chat.recipient : null
  const creator = isPrivateChat ? chat.creator : null

  return (
    <li>
      <Link
        href={`/event/${eventId}/chats/${chat.id}`}
        className={clsx(
          'flex items-center gap-3 px-4 py-3 hover:bg-darker transition-colors'
        )}
      >
        <ChatAvatar chat={chat} />

        <div className="flex flex-col overflow-hidden">
          <span className="flex text-light font-medium truncate">
            {!isPrivateChat && <Users size={16} />}

            {isPrivateChat
              ? (chat.isCreator
                  ? recipient?.user.username
                  : creator?.user.username) || 'Unnamed user'
              : chat.name || 'Unnamed chat'}
          </span>

          <ChatLastMessage chat={chat} />
        </div>
      </Link>
    </li>
  )
}

export default ChatListItem
