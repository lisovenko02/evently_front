import ConfirmModal from '@/components/ui/ConfirmModal'
import { useDeleteTaskMutation } from '@/store/task/taskApi'
import toast from 'react-hot-toast'
import { showErrorToast } from '@/utils/showErrorToast'
import { TaskDeleteModalProps } from '../../../../../types/taskComponents.types'

const TaskDeleteModal = ({
  eventId,
  show,
  onClose,
  refetch,
  onConfirm,
  task,
}: TaskDeleteModalProps) => {
  const [deleteTask, { isLoading }] = useDeleteTaskMutation()

  const handleDelete = async () => {
    try {
      await deleteTask({
        taskId: task.id,
        eventId,
      }).unwrap()

      toast.success('Task deleted successfully')
      refetch()
      onConfirm()
    } catch (error) {
      showErrorToast(error)
    }
  }
  return (
    <ConfirmModal
      show={show}
      onClose={onClose}
      onConfirm={handleDelete}
      title={`Delete "${task.title}"?`}
      message="Are you sure you want to delete this task? This action cannot be undone."
      confirmText="Delete Task"
      variant="danger"
      isLoading={isLoading}
    />
  )
}

export default TaskDeleteModal
