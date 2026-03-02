'use client'

import Image from 'next/image'
import { X } from 'lucide-react'
import { ParticipantItemProps } from '../../../../types'

const getRoleBadgeColor = (role: string) => {
  switch (role.toLowerCase()) {
    case 'creator':
      return 'bg-yellow-600 text-black'
    case 'member':
      return 'bg-gray-700 text-white'
    case 'organizer':
      return 'bg-red-500 text-white'
    case 'moderator':
      return 'bg-green-600 text-white'
    case 'user':
      return 'bg-gray-600 text-white'
    default:
      return 'bg-gray-500 text-white'
  }
}

const ParticipantItem = ({
  eventUser,
  chatData,
  onKickClick,
}: ParticipantItemProps) => {
  const roleLabel =
    chatData.type === 'GROUP' && eventUser.id === chatData.creatorId
      ? 'CREATOR'
      : 'MEMBER'

  const roleClass = getRoleBadgeColor(roleLabel)

  const canKick =
    chatData.type === 'GROUP' &&
    chatData.isCreator &&
    eventUser.id !== chatData.creatorId

  return (
    <div className="flex justify-between items-center py-2 hover:bg-[#2a2a2a] px-2 rounded transition">
      <div className="flex items-center gap-3">
        <Image
          src={eventUser.avatar || '/default-avatar.png'}
          alt="User avatar"
          className="w-8 h-8 rounded-full object-cover"
          width={32}
          height={32}
        />
        <p className="text-light">{eventUser.username || 'Unknown'}</p>
      </div>

      <div className="flex items-center gap-2">
        <span
          className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${roleClass}`}
        >
          {roleLabel}
        </span>

        {canKick && (
          <button
            onClick={() => onKickClick(eventUser)}
            className="text-red-500 hover:text-red-400 transition"
            title="Kick from chat"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  )
}

export default ParticipantItem
