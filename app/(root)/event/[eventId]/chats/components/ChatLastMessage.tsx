import { useAuthStore } from '@/store/auth/authStore'
import { Paperclip } from 'lucide-react'
import { formatDistanceToNowStrict } from 'date-fns'
import { ChatDataProp } from '../types'

const ChatLastMessage = ({ chat }: ChatDataProp) => {
  const currentUserId = useAuthStore((state) => state.user?.id)

  const lastMsg = chat.lastMessage
  if (!lastMsg) {
    return <span className="text-gray text-sm truncate">No messages yet</span>
  }

  const isYou = lastMsg?.sender?.user?.id === currentUserId
  const isPrivate = chat.type === 'PRIVATE'
  const hasAttachments = lastMsg.attachments && lastMsg.attachments.length > 0

  const content =
    lastMsg.content.length > 50
      ? lastMsg.content.slice(0, 50) + '…'
      : lastMsg.content
  //                          POTOM YBRAT' lastMsg.createdAt&&
  const createdAt = lastMsg.createdAt
    ? formatDistanceToNowStrict(new Date(lastMsg.createdAt), {
        addSuffix: true,
      })
    : null

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-1 text-sm text-gray truncate">
        {isYou ? (
          <span className="font-semibold text-light">You:</span>
        ) : !isPrivate ? (
          <span className="text-light">
            {lastMsg?.sender?.user?.username?.slice(0, 10)}:
          </span>
        ) : null}

        {hasAttachments && (
          <Paperclip size={14} className="text-gray-400 shrink-0" />
        )}

        <span title={lastMsg.content}>
          {content || (hasAttachments ? 'Attachment' : '')}
        </span>
      </div>

      <span className="text-xs text-gray-500 shrink-0 whitespace-nowrap">
        {createdAt || ''}
      </span>
    </div>
  )
}

export default ChatLastMessage
