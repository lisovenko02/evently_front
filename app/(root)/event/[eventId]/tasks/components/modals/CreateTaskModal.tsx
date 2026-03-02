import Modal from '@/components/ui/Modal'
import { useCreateTaskMutation } from '@/store/task/taskApi'
import { useParams } from 'next/navigation'
import CreateTaskForm from '../forms/CreateTaskForm'
import { FormValues } from '@/utils/formSchemas/createTaskSchema'
import { showErrorToast } from '@/utils/showErrorToast'
import { CreateTaskModalProps } from '../../types/taskComponents.types'

const CreateTaskModal = ({
  show,
  onClose,
  columnId,
  refetch,
}: CreateTaskModalProps) => {
  const { eventId } = useParams()
  const [createTask, { isLoading }] = useCreateTaskMutation()

  const handleSubmit = async (data: FormValues) => {
    try {
      await createTask({
        eventId: Number(eventId),
        data: {
          ...data,
          columnId,
          dueDate: data.dueDate?.toISOString(),
        },
      }).unwrap()

      refetch()
      onClose()
    } catch (error) {
      showErrorToast(error)
    }
  }

  return (
    <Modal show={show} onClose={onClose}>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-light">Create Task</h2>
        <CreateTaskForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </Modal>
  )
}

export default CreateTaskModal
