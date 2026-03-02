'use client'

import { useCreatePrivateChatMutation } from '@/store/chat/chatApi'
import { IEventMemberWithUser } from '@/store/event-user/eventUserTypes'
import { useGetEventMembersQuery } from '@/store/events/eventsApi'
import { MessageCircle } from 'lucide-react'
import Image from 'next/image'
import { useParams } from 'next/navigation'

const fallbackAvatar =
  'https://events2025.s3.eu-north-1.amazonaws.com/3/0c7330da-5a5d-4687-aa5a-28c089056f42'

const getRoleStyle = (role: string) => {
  switch (role) {
    case 'ORGANIZER':
      return 'bg-red-500 text-white'
    case 'MODERATOR':
      return 'bg-green-500 text-white'
    default:
      return 'bg-gray-500 text-white'
  }
}

const MembersPage = () => {
  const { eventId } = useParams()
  const eventIdNumber = Number(eventId)
  // const isValidEventId = !Number.isNaN(eventIdNumber)

  const {
    data: members,
    isLoading,
    error,
  } = useGetEventMembersQuery({
    eventId: eventIdNumber,
  })

  const [createPrivateChat] = useCreatePrivateChatMutation()

  if (isLoading) return <p className="text-gray-300">Loading members...</p>
  if (error) return <p className="text-red-500">Failed to load members.</p>

  const handleCreateChat = async (receiverId: number) => {
    try {
      // potom
      await createPrivateChat({
        eventId: eventIdNumber,
        receiverEventUserId: receiverId,
      }).unwrap()
    } catch (err) {
      console.error('Failed to create or get chat', err)
    }
  }

  return (
    <div className="p-6 text-light">
      <h1 className="text-2xl font-bold mb-6">Event Members</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-3">
          <thead>
            <tr className="text-sm text-gray-400 uppercase">
              <th className="px-4 py-2">Avatar</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Joined At</th>
              <th className="px-4 py-2">Message</th>
            </tr>
          </thead>
          <tbody>
            {members &&
              (members as IEventMemberWithUser[]).map((member) => {
                const { user, role, joinedAt, id } = member
                return (
                  <tr key={id} className="bg-darker rounded-lg shadow-sm">
                    <td className="flex items-center px-4 py-2">
                      <Image
                        src={user.avatar || fallbackAvatar}
                        alt={user.username}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                      />
                    </td>
                    <td className="px-4 py-2 font-medium">
                      {user.firstName} {user.lastName}
                    </td>
                    <td className="px-4 py-2">{user.username}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2 h-full">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${getRoleStyle(
                          role,
                        )}`}
                      >
                        {role}
                      </span>
                    </td>

                    <td className="px-4 py-2 text-sm text-gray-400">
                      {new Date(joinedAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleCreateChat(id)}
                        className="flex gap-2 text-primary hover:text-primary-light transition"
                      >
                        Message <MessageCircle className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MembersPage
