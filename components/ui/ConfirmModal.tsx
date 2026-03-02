import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'

export interface ConfirmModalProps {
  show: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'warning' | 'primary'
  isLoading?: boolean
}

export default function ConfirmModal({
  show,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  isLoading = false,
}: ConfirmModalProps) {
  const getConfirmButtonVariant = () => {
    switch (variant) {
      case 'danger':
        return 'danger'
      case 'warning':
        return 'secondary'
      case 'primary':
        return 'primary'
      default:
        return 'secondary'
    }
  }

  return (
    <Modal show={show} onClose={onClose} size="sm">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-light">{title}</h2>
        <p className="text-gray-300 text-sm">{message}</p>
        <div className="flex justify-end gap-3">
          <Button
            variant="primary"
            onClick={onClose}
            label={cancelText}
            disabled={isLoading}
            size="small"
          />
          <Button
            variant={getConfirmButtonVariant()}
            onClick={onConfirm}
            label={confirmText}
            disabled={isLoading}
            size="small"
          />
        </div>
      </div>
    </Modal>
  )
}
