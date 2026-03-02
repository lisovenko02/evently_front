'use client'

import CustomDatePicker from '@/components/ui/DateFilters/CustomDatePicker'
import CustomInput from '@/components/ui/CustomInput'
import CustomTextarea from '@/components/ui/CustomTextarea'
import Modal from '@/components/ui/Modal'
import CustomSelect from '@/components/ui/Select/CustomSelect'
import { useUpdateTaskDetailsMutation } from '@/store/task/taskApi'
import {
  FormValues,
  updateTaskSchema,
} from '@/utils/formSchemas/updateTaskSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { showErrorToast } from '@/utils/showErrorToast'
import toast from 'react-hot-toast'
import { TaskEditSectionProps } from '../../../../types/taskComponents.types'

const priorityOptions = [
  { value: 'LOW', label: 'Low' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'HIGH', label: 'High' },
]

const TaskEditSection = ({
  task,
  eventId,
  isOpen,
  onClose,
  refetch,
}: TaskEditSectionProps) => {
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(updateTaskSchema),
    defaultValues: {
      title: task.title,
      description: task.description || undefined,
      priority: task.priority,
      dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
    },
  })
  const [updateTask] = useUpdateTaskDetailsMutation()

  const onSubmit = async (data: FormValues) => {
    try {
      await updateTask({
        taskId: task.id,
        eventId,
        data: {
          title: data.title,
          description: data.description,
          priority: data.priority,
          dueDate: data.dueDate ? data.dueDate.toISOString() : undefined,
        },
      }).unwrap()

      toast.success('Task updated successfully')

      refetch()
      onClose()
    } catch (error) {
      showErrorToast(error)
    }
  }

  return (
    <Modal show={isOpen} onClose={onClose} size="md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <CustomInput
          control={control}
          name="title"
          label="Title"
          placeholder="Task title"
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <CustomSelect
            control={control}
            name="priority"
            label="Priority"
            options={priorityOptions}
            required
          />

          <CustomDatePicker
            control={control}
            name="dueDate"
            label="Due Date"
            placeholder="Select due date"
            minDate={new Date()}
          />
        </div>

        <CustomTextarea
          control={control}
          name="description"
          label="Description"
          placeholder="Task description"
        />

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-darker rounded-lg hover:bg-primary/90 flex items-center gap-2 transition-colors"
          >
            <Check size={18} /> Save Changes
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default TaskEditSection
