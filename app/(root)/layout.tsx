'use client'

import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useAuthStore } from '@/store/auth/authStore'
import { useRefreshTokensMutation } from '@/store/auth/authApi'
import { SocketProvider } from '@/contexts/SocketContext'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false)

  const { accessToken, isAuthLoaded, setAuthLoaded } = useAuthStore()
  const [refreshTokens] = useRefreshTokensMutation()

  useEffect(() => {
    if (!accessToken) {
      console.log('accessToken', accessToken)
      refreshTokens()
        .unwrap()
        .catch(() => {
          useAuthStore.getState().logout()
        })
        .finally(() => {
          useAuthStore.getState().setAuthLoaded(true)
        })
    } else {
      setAuthLoaded(true)
    }
  }, [accessToken, refreshTokens, setAuthLoaded])

  if (!isAuthLoaded) return <div>Loading auth...</div>

  return (
    <SocketProvider>
      {/* ROOT */}
      <div className="flex h-screen w-full overflow-hidden">
        {/* SIDEBAR */}
        <aside
          className={`fixed lg:relative top-0 left-0 z-50 h-full transition-all duration-300
            ${isSidebarExpanded ? 'w-64' : 'w-0 lg:w-16'}
          `}
        >
          <Sidebar
            isExpanded={isSidebarExpanded}
            setIsExpanded={setIsSidebarExpanded}
          />
        </aside>

        {/* MAIN */}
        <div className="flex flex-col flex-1 min-w-0">
          {/* NAVBAR */}
          <Navbar
            isExpanded={isSidebarExpanded}
            setIsExpanded={setIsSidebarExpanded}
          />

          {/* SCROLL CONTAINER */}

          <main className="flex-1 overflow-hidden min-h-0">{children}</main>
        </div>
      </div>
    </SocketProvider>
  )
}
