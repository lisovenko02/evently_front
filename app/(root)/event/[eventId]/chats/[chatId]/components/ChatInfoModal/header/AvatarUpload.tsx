import { useUpdateGroupImageMutation } from '@/store/chat/chatApi'
import { Camera } from 'lucide-react'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { ChatDetailsDataProp } from '../../../../types'
import { showErrorToast } from '@/utils/showErrorToast'

const AvatarUpload = ({ chatData }: ChatDetailsDataProp) => {
  const [updateGroupImage] = useUpdateGroupImageMutation()
  const chatType = chatData.type

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('image', file)

    try {
      const asd = await updateGroupImage({
        image: formData,
        chatId: chatData.id,
        eventId: chatData.eventId,
      })

      console.log('asdAVATAR', asd)

      toast.success('Avatar successfully updated')
    } catch (error) {
      showErrorToast(error)
    }
  }

  return (
    <div className="relative group w-16 h-16">
      <Image
        src={
          chatData.chatImg ||
          chatData.otherParticipant?.avatar ||
          '/default-avatar.png'
        }
        alt="Chat avatar"
        className="w-16 h-16 rounded-full object-cover border border-gray-700"
        width={64}
        height={64}
      />
      {chatType === 'GROUP' && chatData.isCreator && (
        <label
          htmlFor="imageUpload"
          className="absolute inset-0 bg-black/60 flex items-end justify-center rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition"
        >
          <Camera className="text-white mb-1" size={18} />
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>
      )}
    </div>
  )
}

export default AvatarUpload
