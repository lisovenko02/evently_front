import Image from 'next/image'
import { components, MultiValueProps } from 'react-select'
import { ParticipantOption } from '../ParticipantsSelect'

export const MultiValue = (props: MultiValueProps<ParticipantOption, true>) => {
  const { data } = props

  return (
    <components.MultiValue {...props}>
      <div>
        <Image
          src={data.avatar}
          alt={data.label}
          width={16}
          height={16}
          objectFit="cover"
          className="w-4 h-4 rounded-full"
        />
        <span>{data.label}</span>
      </div>
    </components.MultiValue>
  )
}
