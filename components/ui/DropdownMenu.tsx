import { useState, useRef, useEffect, ReactNode, MouseEvent } from 'react'
import { MoreHorizontal } from 'lucide-react'

interface DropdownMenuProps {
  trigger?: ReactNode
  children: ReactNode
}

export const DropdownMenu = ({ trigger, children }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: globalThis.MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 p-1 hover:bg-gray-700 rounded"
        type="button"
      >
        {trigger || <MoreHorizontal size={20} />}
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-40 rounded-md shadow-lg bg-dark border-darker z-50">
          {children}
        </div>
      )}
    </div>
  )
}

interface DropdownItemProps {
  children: ReactNode
  icon?: ReactNode
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
  danger?: boolean
  showSubmenu?: boolean
  submenuContent?: ReactNode
  className?: string
}

export const DropdownItem = ({
  children,
  icon,
  onClick,
  danger = false,
  showSubmenu = false,
  submenuContent,
  className = '',
}: DropdownItemProps) => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false)

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onClick?.(e)
    if (showSubmenu) setIsSubmenuOpen(!isSubmenuOpen)
  }

  return (
    <div className="relative group">
      <button
        onClick={handleClick}
        className={`flex items-center w-full px-4 py-2 text-left text-sm ${
          danger
            ? 'text-red-400 hover:bg-red-900/20'
            : 'text-gray-300 hover:bg-gray-700'
        } rounded ${className}`}
        type="button"
      >
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </button>

      {showSubmenu && isSubmenuOpen && (
        <div
          className="absolute left-full top-0 mr-1 z-50"
          onMouseLeave={() => setIsSubmenuOpen(false)}
        >
          {submenuContent}
        </div>
      )}
    </div>
  )
}
