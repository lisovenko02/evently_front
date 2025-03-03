import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

type Option = {
  value: string
  label: string
}

type CustomSelectProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  label: string
  options: Option[]
}

const CustomSelect = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  options,
}: CustomSelectProps<TFieldValues>) => {
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
      <select
        {...field}
        className="w-full p-3 bg-dark border border-primary-dark rounded-md focus:ring-primary-light focus:outline-none"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  )
}

export default CustomSelect
