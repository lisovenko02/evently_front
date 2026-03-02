import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import { ConfirmKickModalProps } from '../../../../types'

export default function ConfirmKickModal({
  show,
  onClose,
  username,
  onConfirm,
}: ConfirmKickModalProps) {
  return (
    <Modal show={show} onClose={onClose}>
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-light">
          Kick {username} from chat?
        </h2>
        <p className="text-gray text-sm">
          This action cannot be undone. Are you sure you want to continue?
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="primary" onClick={onClose} label="Cancel" />
          <Button variant="secondary" onClick={onConfirm} label="Kick" />
        </div>
      </div>
    </Modal>
  )
}
