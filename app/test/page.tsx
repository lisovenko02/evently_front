'use client'

import Button from '@/components/ui/Button'
import Image from 'next/image'

export default function ColorsDemo() {
  return (
    <div className="min-h-screen bg-dark p-8 flex flex-col gap-8 items-center">
      <h1 className="text-primary text-4xl">Color Scheme Demo</h1>

      {/* Primary colors */}
      <div className="flex gap-8 justify-center">
        <div className="w-32 h-32 bg-primary text-center flex items-center justify-center text-dark rounded-lg shadow-lg">
          Primary
        </div>
        <div className="w-32 h-32 bg-primary-dark text-center flex items-center justify-center text-dark rounded-lg shadow-lg">
          Primary Dark
        </div>
        <div className="w-32 h-32 bg-primary-light text-center flex items-center justify-center text-dark rounded-lg shadow-lg">
          Primary Light
        </div>
      </div>

      {/* Text colors */}
      <div className="flex gap-8 justify-center">
        <div className="w-32 h-32 bg-darker text-center flex items-center justify-center text-light rounded-lg shadow-lg">
          Text Light
        </div>
        <div className="w-32 h-32 bg-darker text-center flex items-center justify-center text-text-gray rounded-lg shadow-lg">
          Text Gray
        </div>
      </div>

      {/* Background colors */}
      <div className="flex gap-8 justify-center">
        <div className="w-32 h-32 bg-dark text-center flex items-center justify-center text-light rounded-lg shadow-lg">
          BG Dark
        </div>
        <div className="w-32 h-32 bg-darker text-center flex items-center justify-center text-light rounded-lg shadow-lg">
          BG Darker
        </div>
      </div>

      {/* Example of button */}
      <a
        className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-primary text-dark gap-2 hover:bg-primary-dark text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
        href="https://vercel.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          className="dark:invert"
          src="/vercel.svg"
          alt="Vercel logomark"
          width={20}
          height={20}
        />
        Deploy now
      </a>
      <div className="flex gap-6 flex-col">
        <h2>BUTTONS</h2>

        <Button
          label="Click Me"
          onClick={() => alert('Button clicked!')}
          variant="primary"
          size="medium"
        />
        <Button
          label="Secondary Button"
          onClick={() => alert('Secondary button clicked!')}
          variant="secondary"
          size="medium"
        />
      </div>
    </div>
  )
}
