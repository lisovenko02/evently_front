import Button from '@/components/ui/Button'
import CustomDatePicker from '@/components/ui/DateFilters/CustomDatePicker'
import CustomInput from '@/components/ui/CustomInput'
import CustomTextarea from '@/components/ui/CustomTextarea'
import CustomSelect from '@/components/ui/Select/CustomSelect'
import {
  createTaskSchema,
  FormValues,
} from '@/utils/formSchemas/createTaskSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { CreateTaskFormProps } from '../../types/taskComponents.types'

const priorityOptions = [
  { value: 'LOW', label: 'Low' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'HIGH', label: 'High' },
]

const CreateTaskForm = ({ onSubmit, isLoading }: CreateTaskFormProps) => {
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      priority: 'LOW',
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <CustomInput
        control={control}
        name="title"
        label="Title"
        placeholder="Enter your title"
        required
      />

      <CustomTextarea
        control={control}
        name="description"
        label="Description"
        placeholder="Short event description"
        required={false}
      />

      <div className="grid grid-cols-2 gap-4">
        <CustomSelect
          control={control}
          name="priority"
          label="Priority"
          options={priorityOptions}
          required
        />

        <CustomInput
          control={control}
          name="points"
          type="number"
          label="Points"
          placeholder="0"
          required={false}
        />
      </div>

      <CustomDatePicker
        control={control}
        name="dueDate"
        label="Due date"
        placeholder="Select due date"
        minDate={new Date()}
      />

      <div className="flex justify-end gap-3 pt-4">
        <Button
          variant="primary"
          label={isLoading ? 'Saving...' : 'Save Task'}
          type="submit"
          disabled={isLoading}
        />
      </div>
    </form>
  )
}

export default CreateTaskForm
