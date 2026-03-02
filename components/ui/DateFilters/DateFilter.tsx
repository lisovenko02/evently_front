'use client'

import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { DateFilterProps } from '../../../app/(root)/event/[eventId]/history/types/historyComponents.types'
import { useMediaQuery } from 'react-responsive'

export const DateFilter = ({ from, to, setFrom, setTo }: DateFilterProps) => {
  const fromDate = from ? new Date(from) : null
  const toDate = to ? new Date(to) : null
  const today = new Date()

  const isMobile = useMediaQuery({ maxWidth: 640 })

  return (
    <div
      className={`flex ${
        isMobile ? 'flex-col gap-2' : 'flex-row gap-3 items-center'
      } w-full`}
    >
      {/* FROM */}
      <div className="flex flex-col gap-1 w-full">
        <span className="text-xs text-gray-400">From</span>
        <ReactDatePicker
          selected={fromDate}
          onChange={(date) => setFrom(date ? date.toISOString() : null)}
          selectsStart
          startDate={fromDate}
          endDate={toDate}
          maxDate={today}
          placeholderText="Start date"
          className="bg-accent-gray border border-gray-700 rounded-md px-2 py-1 text-sm text-light w-full"
          calendarClassName="bg-dark border border-gray-700 rounded-md"
          popperPlacement={isMobile ? 'top-start' : 'bottom-start'}
        />
      </div>

      {!isMobile && <span className="text-gray-500 mt-5">—</span>}

      {/* TO */}
      <div className="flex flex-col gap-1 w-full">
        <span className="text-xs text-gray-400">To</span>
        <ReactDatePicker
          selected={toDate}
          onChange={(date) => setTo(date ? date.toISOString() : null)}
          selectsEnd
          startDate={fromDate}
          endDate={toDate}
          minDate={fromDate ?? undefined}
          maxDate={today}
          placeholderText="End date"
          className="bg-accent-gray border border-gray-700 rounded-md px-2 py-1 text-sm text-light w-full"
          calendarClassName="bg-dark border border-gray-700 rounded-md"
          popperPlacement={isMobile ? 'top-start' : 'bottom-start'}
        />
      </div>

      {/* FOR MOBILE */}
      {isMobile && <span className="text-gray-500 my-1 text-center">—</span>}
    </div>
  )
}
