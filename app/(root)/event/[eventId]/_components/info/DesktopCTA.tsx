import clsx from 'clsx'
import { ButtonCTAProps } from '../../_types/eventComponents.types'

const DesktopCTA = ({ cta, onClick }: ButtonCTAProps) => (
  <div className="hidden lg:block sticky bottom-0 p-4">
    <button
      onClick={onClick}
      disabled={cta.disabled}
      className={clsx('w-full py-3.5 rounded-xl font-semibold transition', {
        'bg-primary hover:bg-primary-dark text-black':
          cta.variant === 'primary',
        'bg-gray-700 text-gray-400 cursor-not-allowed':
          cta.variant === 'disabled',
        'bg-indigo-800 text-light hover:bg-indigo-600':
          cta.variant === 'secondary',
      })}
    >
      {cta.label}
    </button>
  </div>
)

export default DesktopCTA
