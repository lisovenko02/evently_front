'use client'

import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useAuthStore } from '@/store/auth/authStore'
import { useRefreshTokensMutation } from '@/store/auth/authApi'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false)

  const { accessToken } = useAuthStore()
  const [refreshTokens] = useRefreshTokensMutation()

  useEffect(() => {
    if (!accessToken) {
      refreshTokens()
    }
  }, [accessToken, refreshTokens])

  return (
    <div className="flex w-full min-h-screen">
      <Sidebar
        isExpanded={isSidebarExpanded}
        setIsExpanded={setIsSidebarExpanded}
      />
      <main
        className={`flex flex-col w-full h-full min-h-screen pt-16 ${
          isSidebarExpanded ? 'md:pl-64' : 'md:pl-16'
        }`}
      >
        <Navbar />
        {children}
      </main>
    </div>
  )
}
