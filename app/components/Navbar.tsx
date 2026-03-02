import { Bell, Menu, X } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { ExpandedProps } from './Sidebar'

const Navbar = ({ isExpanded, setIsExpanded }: ExpandedProps) => {
  return (
    <header className="sticky top-0 z-50 h-16 bg-accent-dark border-b border-gray-700">
      <div className="flex justify-between items-center h-full px-4 md:px-6">
        {/* LEFT SIDE: Sidebar Toggle */}
        <button
          className="p-2 rounded-full bg-primary text-dark shadow-lg hover:opacity-90 transition-opacity duration-300"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? <X size={18} /> : <Menu size={18} />}
        </button>

        {/* RIGHT SIDE: Notifications + Profile */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 rounded-full hover:bg-gray-800 transition-colors duration-300">
            <Bell className="w-6 h-6 text-light" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
          </button>

          {/* Profile */}
          <div className="flex items-center gap-2">
            <Image
              src="https://events2025.s3.eu-north-1.amazonaws.com/1/da0d0b8d-3bae-4a4a-ad3f-a9fdac25f681"
              alt="User Avatar"
              width={35}
              height={35}
              className="rounded-full"
            />
            <span className="text-light text-sm">Ivan</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
