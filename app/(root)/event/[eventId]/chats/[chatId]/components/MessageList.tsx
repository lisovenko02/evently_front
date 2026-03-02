import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { format } from 'date-fns'
import { MessageListProps } from '../../types'

const MessageList = ({ messages, myUserId, chatType }: MessageListProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])
  return (
    <div
      ref={scrollRef}
      className="space-y-2 overflow-y-auto border p-2 rounded h-full"
    >
      {messages.map((msg, index) => {
        const isMine = msg.senderId === myUserId
        const avatarUrl = msg.sender?.user?.avatar || '/default-avatar.png'
        const username = msg.sender?.user?.username || 'Unknown'

        return (
          <div
            key={index}
            className={`flex items-start gap-2 ${
              isMine ? 'justify-end' : 'justify-start'
            }`}
          >
            {/* Аватар (лише для не своїх повідомлень у групових чатах) */}
            {!isMine && chatType !== 'PRIVATE' && (
              <Image
                src={avatarUrl}
                alt="User avatar"
                className="w-8 h-8 rounded-full object-cover mt-1"
                width={32}
                height={32}
              />
            )}

            {/* Саме повідомлення */}
            <div
              className={`max-w-[70%] p-2 rounded break-words relative ${
                isMine
                  ? 'bg-primary text-black text-right ml-auto'
                  : 'bg-gray-800 text-white text-left'
              }`}
            >
              {/* Ім'я відправника */}
              {!isMine && chatType !== 'PRIVATE' && (
                <div className="text-xs text-gray-400 mb-1">{username}</div>
              )}

              {/* Вкладення (зображення або файли) */}
              {msg.attachments?.length > 0 && (
                <div className="space-y-2 mb-1">
                  {msg.attachments.map((att) => {
                    const isImage = /\.(jpg|jpeg|png|webp|gif)$/i.test(
                      att.fileName
                    )
                    return (
                      <div key={att.id}>
                        {isImage ? (
                          <Image
                            src={att.fileUrl}
                            alt={att.fileName}
                            width={300}
                            height={300}
                            className="rounded max-h-64 object-contain"
                          />
                        ) : (
                          <a
                            href={att.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 underline break-all"
                          >
                            {att.fileName}
                          </a>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}

              {/* Контент повідомлення */}
              {msg.content && <div className="mb-4">{msg.content}</div>}

              {/* Час відправки */}
              <div className="absolute bottom-1 right-2 text-[10px] text-gray-400">
                {format(new Date(msg.createdAt), 'HH:mm') || '00:00'}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default MessageList
