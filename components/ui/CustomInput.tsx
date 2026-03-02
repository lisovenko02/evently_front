import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

type CustomInputProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  label: string
  placeholder: string
  type?: string
  required?: boolean
}

const CustomInput = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  required,
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
      <label className="block text-gray-300">
        {label}

        {required && <strong className="text-red-600 ml-1">*</strong>}
      </label>
      <input
        {...field}
        type={type}
        placeholder={placeholder}
        onChange={(e) => {
          const value =
            type === 'number'
              ? e.target.value === ''
                ? undefined
                : Number(e.target.value)
              : e.target.value
          field.onChange(value)
        }}
        className="w-full p-3 bg-dark border border-primary-dark rounded-md focus:ring-primary-light focus:outline-none h-[46px]"
      />
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  )
}

export default CustomInput
