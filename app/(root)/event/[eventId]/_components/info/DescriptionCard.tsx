import { useEffect, useRef, useState } from 'react'
import { FcAbout } from 'react-icons/fc'
import { DescriptionCardProps } from '../../_types/eventComponents.types'

const DescriptionCard = ({ description }: DescriptionCardProps) => {
  const [showFullDesc, setShowFullDesc] = useState(false)
  const [isClamped, setIsClamped] = useState(false)

  const descRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (descRef.current) {
      setIsClamped(descRef.current.scrollHeight > descRef.current.clientHeight)
    }
  }, [description])

  return (
    <div className="flex flex-col gap-2 bg-accent-gray2 rounded-xl p-4">
      <div className="flex items-center gap-1 text-xs text-text-gray">
        <FcAbout size={16} />
        About
      </div>

      <p
        ref={descRef}
        className={`text-sm text-light leading-relaxed ${
          showFullDesc ? '' : 'line-clamp-3'
        }`}
      >
        {description}
      </p>
      {isClamped && (
        <button
          onClick={() => setShowFullDesc(!showFullDesc)}
          className="text-xs text-primary hover:text-primary-dark self-start"
        >
          {showFullDesc ? 'Show less' : 'Show more'}
        </button>
      )}
    </div>
  )
}

export default DescriptionCard
