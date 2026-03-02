import Modal from '@/components/ui/Modal'
import { EditEventModalProps } from '../../_types/eventComponents.types'

const EditEventModal = ({ onClose }: EditEventModalProps) => {
  return (
    // POTOM
    <Modal show={true} onClose={onClose} size="md">
      EditEventModal
    </Modal>
  )
}

export default EditEventModal
