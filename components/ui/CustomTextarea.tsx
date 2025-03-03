import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

type CustomTextareaProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  label: string
  placeholder: string
}

const CustomTextarea = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
}: CustomTextareaProps<TFieldValues>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  })

  return (
    <div>
      <label className="block text-gray-300">{label}</label>
      <textarea
        {...field}
        placeholder={placeholder}
        className="w-full p-3 bg-dark border border-primary-dark rounded-md focus:ring-primary-light focus:outline-none resize-none"
      />
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  )
}

export default CustomTextarea
