import Image from 'next/image'
import { BackgroundSelectorProps } from '../../types/taskComponents.types'

const BackgroundSelector = ({
  backgrounds,
  currentBackground,
  onSelect,
}: BackgroundSelectorProps) => {
  return (
    <header className="flex items-center gap-2 px-4 py-2 h-24 shrink-0 overflow-x-auto bg-black/40 backdrop-blur">
      {backgrounds.map((bg) => (
        <button
          key={bg}
          onClick={() => onSelect(bg)}
          className={`w-14 h-14 rounded overflow-hidden border-2 flex-shrink-0 ${
            bg === currentBackground ? 'border-primary' : 'border-white/50'
          }`}
        >
          <Image
            src={bg}
            alt="Background preview"
            width={56}
            height={56}
            className="object-cover w-full h-full"
          />
        </button>
      ))}

      <button
        onClick={() => onSelect(null)}
        className="w-14 h-14 rounded border-2 border-white/50 bg-black/30 text-xs text-white flex items-center justify-center"
      >
        None
      </button>
    </header>
  )
}

export default BackgroundSelector
