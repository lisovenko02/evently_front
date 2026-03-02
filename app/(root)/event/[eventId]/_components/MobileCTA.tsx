import clsx from 'clsx'
import { ButtonCTAProps } from '../_types/eventComponents.types'

const MobileCTA = ({ cta, onClick }: ButtonCTAProps) => (
  <div className="lg:hidden fixed bottom-0 left-0 w-full bg-bg-gray border-t border-dark p-4 z-40">
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

export default MobileCTA
