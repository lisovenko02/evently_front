import { useUpdateGroupNameMutation } from '@/store/chat/chatApi'
import { ChatDetailsDataProp } from '../../../../types'

import { PencilLine } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { showErrorToast } from '@/utils/showErrorToast'

const NameEditor = ({ chatData }: ChatDetailsDataProp) => {
  const [isEditing, setIsEditing] = useState(false)
  const [chatName, setChatName] = useState(chatData?.name || '')

  const [updateGroupName] = useUpdateGroupNameMutation()

  const chatType = chatData.type

  const handleNameUpdate = async () => {
    setIsEditing(false)

    if (chatName !== chatData.name) {
      try {
        // potom
        const asd = await updateGroupName({
          name: chatName,
          chatId: chatData.id,
          eventId: chatData.eventId,
        })
        console.log('asdNAME', asd)

        toast.success('Group Name successfully updated')
      } catch (error) {
        showErrorToast(error)
      }
    }
  }
  return (
    <div className="flex-1">
      <div className="flex gap-2">
        {isEditing ? (
          <input
            autoFocus
            value={chatName}
            onChange={(e) => setChatName(e.target.value)}
            onBlur={handleNameUpdate}
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.currentTarget.blur()
            }}
            className="w-full bg-transparent text-light border-b border-gray-600 focus:outline-none focus:border-primary"
          />
        ) : (
          <>
            <h2 className="text-xl font-semibold text-light truncate">
              {chatData.name || chatData.otherParticipant?.username}
            </h2>
            {chatType === 'GROUP' && chatData.isCreator && (
              <PencilLine
                size={18}
                className="text-gray-400 hover:text-light cursor-pointer transition"
                onClick={() => setIsEditing(true)}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default NameEditor
