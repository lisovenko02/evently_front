import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import { ConfirmDeleteModalProps } from '../../../../types'

const ConfirmDeleteChatModal = ({
  show,
  onClose,
  chatName,
  onConfirm,
}: ConfirmDeleteModalProps) => {
  return (
    <Modal show={show} onClose={onClose}>
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-light">
          Delete chat{chatName ? ` “${chatName}”` : ''}?
        </h2>
        <p className="text-gray text-sm">
          This action cannot be undone. Are you sure you want to delete this
          chat?
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="primary" onClick={onClose} label="Cancel" />
          <Button variant="danger" onClick={onConfirm} label="Delete" />
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmDeleteChatModal
