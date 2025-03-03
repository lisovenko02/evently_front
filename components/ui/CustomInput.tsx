import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

type CustomInputProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  label: string
  placeholder: string
  type?: string
}

const CustomInput = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = 'text',
}: CustomInputProps<TFieldValues>) => {
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
      <input
        {...field}
        type={type}
        placeholder={placeholder}
        onChange={(e) => {
          const value =
            type === 'number' ? Number(e.target.value) || '' : e.target.value
          field.onChange(value)
        }}
        className="w-full p-3 bg-dark border border-primary-dark rounded-md focus:ring-primary-light focus:outline-none"
      />
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  )
}

export default CustomInput
