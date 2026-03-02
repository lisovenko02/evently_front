import Modal from '@/components/ui/Modal'
import React from 'react'
import { InviteToEventModalProps } from '../../types/userProfileComponents.types'

const InviteToEventModal = ({ isOpen, onClose }: InviteToEventModalProps) => {
  return (
    <Modal
      show={isOpen}
      onClose={onClose}
      size="xl"
      className="flex flex-col max-h-[90vh]"
    >
      <div>InviteToEventModal</div>
    </Modal>
  )
}

export default InviteToEventModal
