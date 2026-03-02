import Image from 'next/image'
import { OptionProps } from 'react-select'
import { ParticipantOption } from '../ParticipantsSelect'

export const Option = (props: OptionProps<ParticipantOption, true>) => {
  const { data, innerRef, innerProps } = props

  return (
    <div
      ref={innerRef}
      {...innerProps}
      className="flex items-center gap-2 px-3 py-2 hover:bg-gray-800 cursor-pointer"
    >
      <Image
        src={data.avatar}
        alt={data.label}
        width={16}
        height={16}
        objectFit="cover"
        className="w-6 h-6 rounded-full object-cover"
      />
      <span>{data.label}</span>
    </div>
  )
}
