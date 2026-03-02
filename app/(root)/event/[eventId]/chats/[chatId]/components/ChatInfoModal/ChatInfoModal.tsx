import Modal from '@/components/ui/Modal'
import ModalHeader from './header/ModalHeader'
import ParticipantsList from './participants/ParticipantsList'
import { ChatInfoModalProps } from '../../../types'

const ChatInfoModal = ({ show, onClose, chatData }: ChatInfoModalProps) => {
  if (!chatData) return null

  const chatType = chatData.type

  return (
    <Modal show={show} onClose={onClose}>
      <ModalHeader chatData={chatData} />
      {chatType !== 'PRIVATE' && <ParticipantsList chatData={chatData} />}
    </Modal>
  )
}

export default ChatInfoModal
