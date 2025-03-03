import { Bell } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 w-full h-16 py-4 px-9 bg-accent-dark pl-10 pb-2 border-b border-gray-700 z-10">
      <div className="flex justify-end items-center w-full">
        {/* LEFT SIDE */}

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          {/* NOTIFICATIONS */}
          <button className="relative p-2 rounded-full hover:bg-gray-800 transition-colors duration-300">
            <Bell className="w-6 h-6 text-light" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
          </button>

          {/* PROFILE */}
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
