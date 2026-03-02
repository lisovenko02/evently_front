import Image from 'next/image'
import { ChatDetailsDataProp } from '../../types'

const ChatHeader = ({ chatData }: ChatDetailsDataProp) => {
  const isPrivate = chatData.type === 'PRIVATE'
  const avatar = isPrivate
    ? chatData.otherParticipant?.avatar
    : chatData.chatImg

  const name = isPrivate ? chatData.otherParticipant?.username : chatData.name

  return (
    <div className="flex items-center gap-4 mb-4 cursor-pointer">
      <Image
        src={avatar || '/default-avatar.png'}
        alt="Avatar"
        className="w-12 h-12 rounded-full object-cover border border-gray-700"
        width={48}
        height={48}
      />
      <h2 className="text-2xl font-semibold text-light">{name}</h2>
    </div>
  )
}

export default ChatHeader
