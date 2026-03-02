'use client'

import { cn } from '@/utils/cn'
import { Dialog, Transition } from '@headlessui/react'
import { X } from 'lucide-react'
import { Fragment } from 'react'

type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

export interface ModalProps {
  children?: React.ReactNode
  show: boolean
  onClose: () => void
  size?: ModalSize
  closeButton?: boolean
  className?: string
}

const sizeClasses: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-2xl',
  full: 'max-w-[95vw]',
}

export default function Modal({
  show,
  children,
  onClose,
  size = 'md',
  closeButton = true,
  className = '',
}: ModalProps) {
  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-50" onClose={onClose}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-[#1C1C1C] bg-opacity-70 backdrop-blur-sm" />
        </Transition.Child>

        {/* Modal content */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="scale-95 opacity-0"
            enterTo="scale-100 opacity-100"
            leave="ease-in duration-200"
            leaveFrom="scale-100 opacity-100"
            leaveTo="scale-95 opacity-0"
          >
            <Dialog.Panel
              className={cn(
                'relative w-full rounded-2xl bg-darker p-6 shadow-2xl border border-gray-700',
                sizeClasses[size],
                className
              )}
            >
              {/* Close btn */}
              {closeButton && (
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-gray-400 hover:text-light transition"
                >
                  <X size={20} />
                </button>
              )}
              {children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
