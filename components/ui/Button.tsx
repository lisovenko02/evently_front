'use client'

interface ButtonProps {
  label: string
  type?: 'button' | 'submit' | 'reset' | undefined
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = 'primary',
  size = 'medium',
  type = 'button',
  disabled,
}) => {
  const buttonStyles = {
    base: 'rounded-md font-montserrat text-light transition-all duration-300 ease-in-out',
    primary:
      'bg-primary-dark text-darker hover:bg-primary-light focus:ring-2 focus:ring-primary-light',
    secondary:
      'bg-transparent border-2 border-primary text-primary hover:bg-primary-light hover:text-darker focus:ring-2 focus:ring-primary',
    danger:
      'bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 border-2 border-red-600',
    small: 'w-full px-4 py-2 text-sm',
    medium: 'w-full px-6 py-3 text-base',
    large: 'w-full px-8 py-4 text-lg',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${buttonStyles.base} ${buttonStyles[variant]} ${buttonStyles[size]}`}
    >
      {label}
    </button>
  )
}

export default Button
