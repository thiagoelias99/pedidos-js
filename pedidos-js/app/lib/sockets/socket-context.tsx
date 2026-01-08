"use client"

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { createSocket, AppSocket } from './socket'

interface SocketContextValue {
  socket: AppSocket | null
  isConnected: boolean
}

const SocketContext = createContext<SocketContextValue>({
  socket: null,
  isConnected: false,
})

export function SocketProvider({
  token,
  children,
}: {
  token?: string
  children: React.ReactNode
}) {
  const socketRef = useRef<AppSocket | null>(null)
  const [socket, setSocket] = useState<AppSocket | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    if (!token) return

    if (!socketRef.current) {
      socketRef.current = createSocket(token)
      setSocket(socketRef.current)
    }

    const socket = socketRef.current

    const onConnect = () => setIsConnected(true)
    const onDisconnect = () => setIsConnected(false)

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.disconnect()
      socketRef.current = null
      setSocket(null)
    }
  }, [token])

  return (
    <SocketContext.Provider
      value={{
        socket,
        isConnected,
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}

export function useSocket() {
  return useContext(SocketContext)
}
