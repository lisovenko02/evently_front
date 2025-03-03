import React from 'react'
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
      <label className="block text-white">{label}</label>
      <input
        className="w-full p-3 text-white bg-transparent border-b border-gray-500 focus:outline-none placeholder-white/80"
        {...field}
        type={type}
        placeholder={placeholder}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  )
}

export default CustomInput
