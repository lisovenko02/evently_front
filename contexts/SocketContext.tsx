'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { useAuthStore } from '@/store/auth/authStore'
import { TypedSocket } from '@/app/types/socketTypes'

type SocketContextType = {
  socket: TypedSocket | null
  isReady: boolean
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isReady: false,
})

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { accessToken, user } = useAuthStore()
  const [socket, setSocket] = useState<TypedSocket | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (!accessToken || !user?.id) return

    const newSocket: TypedSocket = io(process.env.NEXT_PUBLIC_API_BASE_URL!, {
      autoConnect: false,
      auth: { token: accessToken },
    })

    newSocket.connect()

    newSocket.emit('joinUserRoom', { userId: user.id })

    newSocket.on('connect', () => {
      setIsReady(true)
    })

    setSocket(newSocket)

    return () => {
      newSocket.disconnect()
      setIsReady(false)
    }
  }, [accessToken, user?.id])

  return (
    <SocketContext.Provider value={{ socket, isReady }}>
      {children}
    </SocketContext.Provider>
  )
}

export const useSocket = () => useContext(SocketContext)
