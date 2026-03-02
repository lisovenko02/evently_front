import { Trash2 } from 'lucide-react'
import { useDeleteGroupChatMutation } from '@/store/chat/chatApi'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChatDetailsDataProp } from '../../../../types'
import ConfirmModal from '@/components/ui/ConfirmModal'
import { showErrorToast } from '@/utils/showErrorToast'

const DeleteChatButton = ({ chatData }: ChatDetailsDataProp) => {
  const [deleteGroupChat, { isLoading }] = useDeleteGroupChatMutation()
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    try {
      await deleteGroupChat({
        chatId: chatData.id,
        eventId: chatData.eventId,
      }).unwrap()
      toast.success('Chat deleted successfully')
      router.push(`/event/${chatData.eventId}/chats`)
    } catch (error) {
      showErrorToast(error)
    } finally {
      setShowConfirmModal(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setShowConfirmModal(true)}
        disabled={isLoading}
        className="ml-auto p-1.5 rounded-full hover:bg-red-600/20 transition"
        title="Delete group chat"
      >
        <Trash2 className="text-red-500" size={20} />
      </button>

      <ConfirmModal
        show={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleDelete}
        title={`Delete chat${chatData.name ? ` “${chatData.name}”` : ''}?`}
        message="This action cannot be undone. Are you sure you want to delete this chat?"
        confirmText="Delete"
        variant="danger"
        isLoading={isLoading}
      />
    </>
  )
}

export default DeleteChatButton
