'use client'

import { useState } from 'react'
import { useGetEventMembersQuery } from '@/store/events/eventsApi'
import {
  useAddParticipantToChatMutation,
  useKickParticipantFromChatMutation,
} from '@/store/chat/chatApi'
import ParticipantItem from './ParticipantItem'
import { ParticipantsSelect } from '@/components/ui/Select/ParticipantsSelect'
import toast from 'react-hot-toast'
import { ChatDetailsDataProp } from '../../../../types'
import ConfirmModal from '@/components/ui/ConfirmModal'
import { showErrorToast } from '@/utils/showErrorToast'
import { IChatDetailsParticipant } from '@/store/chat/chatTypes'

const ParticipantsList = ({ chatData }: ChatDetailsDataProp) => {
  const { data: members } = useGetEventMembersQuery({
    eventId: chatData.eventId,
    full: false,
  })
  const [addParticipant, { isLoading }] = useAddParticipantToChatMutation()
  const [kickParticipant, { isLoading: isKicking }] =
    useKickParticipantFromChatMutation()

  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([])
  const [isKickModalOpen, setIsKickModalOpen] = useState<boolean>(false)
  const [userToKick, setUserToKick] = useState<IChatDetailsParticipant | null>(
    null,
  )

  const participantsIds = chatData.participants.map((p) => p.id)

  const usersNotInChat =
    members?.filter((user) => !participantsIds.includes(user.id)) || []

  const options = usersNotInChat.map((user) => {
    return {
      avatar: user.user.avatar,
      label: user.user.username,
      value: user.id,
    }
  })

  const handleChange = (newIds: number[]) => {
    setSelectedUserIds(newIds)
  }

  const handleAddParticipants = async () => {
    for (const userId of selectedUserIds) {
      try {
        await addParticipant({
          chatId: chatData.id,
          eventId: chatData.eventId,
          dto: { eventUserId: Number(userId) },
        }).unwrap()

        toast.success('You successfully add participant(s)')
      } catch (error) {
        showErrorToast(error)
      }
    }

    setSelectedUserIds([])
  }

  const openKickModal = (eventUser: IChatDetailsParticipant) => {
    setUserToKick(eventUser)
    setIsKickModalOpen(true)
  }

  const closeKickModal = () => {
    setUserToKick(null)
    setIsKickModalOpen(false)
  }

  const confirmKick = async () => {
    if (!userToKick) return

    try {
      await kickParticipant({
        chatId: chatData.id,
        eventUserId: userToKick.id,
        eventId: chatData.eventId,
      }).unwrap()
      toast.success(`${userToKick.username} was kicked`)
    } catch (error) {
      showErrorToast(error)
    } finally {
      closeKickModal()
    }
  }

  return (
    <div>
      <h3 className="text-light text-lg font-semibold my-3">Participants</h3>

      <div className="divide-y divide-gray-700 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent pr-1">
        {chatData.participants.map((eventUser) => (
          <ParticipantItem
            key={eventUser.id}
            eventUser={eventUser}
            chatData={chatData}
            onKickClick={openKickModal}
          />
        ))}
      </div>

      {options.length > 0 && (
        <div className="mt-6">
          <ParticipantsSelect
            options={options}
            value={options.filter((opt) => selectedUserIds.includes(opt.value))}
            isLoading={isLoading}
            onChange={handleChange}
          />
          <button
            onClick={handleAddParticipants}
            disabled={selectedUserIds.length === 0 || isLoading}
            className="mt-3 bg-primary text-black px-4 py-2 rounded hover:bg-primary-dark transition disabled:opacity-50"
          >
            Add Participants
          </button>
        </div>
      )}

      <ConfirmModal
        show={isKickModalOpen}
        onClose={closeKickModal}
        onConfirm={confirmKick}
        title={`Kick ${userToKick?.username || ''} from chat?`}
        message="This action cannot be undone. Are you sure you want to continue?"
        confirmText="Kick"
        variant="danger"
        isLoading={isKicking}
      />
    </div>
  )
}

export default ParticipantsList
