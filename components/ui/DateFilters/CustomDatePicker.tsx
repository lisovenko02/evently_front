'use client'

import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'
import { useState, useRef, useEffect } from 'react'

type CustomDatePickerProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  label: string
  placeholder?: string
  required?: boolean
  minDate?: Date
  maxDate?: Date
}

const CustomDatePicker = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder = 'Select date',
  required,
  minDate,
  maxDate,
}: CustomDatePickerProps<TFieldValues>) => {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState<'bottom' | 'top'>('bottom')
  const wrapperRef = useRef<HTMLDivElement>(null)
  const pickerRef = useRef<HTMLDivElement>(null)

  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  })

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (isOpen && wrapperRef.current && pickerRef.current) {
      const wrapperRect = wrapperRef.current.getBoundingClientRect()
      const spaceBelow = window.innerHeight - wrapperRect.bottom
      const pickerHeight = 300 // approximate height of the date picker

      if (spaceBelow < pickerHeight && wrapperRect.top > pickerHeight) {
        setPosition('top')
      } else {
        setPosition('bottom')
      }
    }
  }, [isOpen])

  return (
    <div className="relative" ref={wrapperRef}>
      <label className="block text-gray-300">
        {label}
        {required && <strong className="text-red-600 ml-1">*</strong>}
      </label>

      <div
        className="w-full p-3 bg-dark border border-primary-dark rounded-md focus:ring-primary-light focus:outline-none cursor-pointer hover:border-primary transition-colors h-[46px] flex items-center" // Додано фіксовану висоту та flex
        onClick={() => setIsOpen(!isOpen)}
      >
        {field.value ? new Date(field.value).toLocaleDateString() : placeholder}
      </div>

      {isOpen && (
        <div
          ref={pickerRef}
          className={`absolute z-10 ${
            position === 'bottom' ? 'mt-1' : 'bottom-full mb-1'
          }`}
        >
          <ReactDatePicker
            selected={field.value ? new Date(field.value) : null}
            onChange={(date) => {
              field.onChange(date)
              setIsOpen(false)
            }}
            onCalendarClose={() => setIsOpen(false)}
            minDate={minDate}
            maxDate={maxDate}
            inline
            calendarClassName="bg-dark border border-primary-dark rounded-md p-2 shadow-lg"
            dayClassName={(date) =>
              `p-2 rounded-md text-center ${
                field.value &&
                date.getDate() === new Date(field.value).getDate() &&
                date.getMonth() === new Date(field.value).getMonth() &&
                date.getFullYear() === new Date(field.value).getFullYear()
                  ? 'bg-primary text-white'
                  : 'hover:bg-primary-dark text-gray-300'
              }`
            }
            weekDayClassName={() => 'text-gray-400 text-xs py-1'}
            monthClassName={() => 'text-gray-300'}
          />
        </div>
      )}

      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  )
}

export default CustomDatePicker
