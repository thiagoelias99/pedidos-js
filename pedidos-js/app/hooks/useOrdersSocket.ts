"use client"

import { useEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { IOrder } from "../actions/orders/get-orders"

const EVENTS = {
  CREATED: 'orderCreated',
  UPDATED: 'orderUpdated',
  DELETED: 'orderDeleted',
}

export function useOrdersSocket({ authorization, initialOrders }: { authorization?: string, initialOrders?: IOrder[] } = {}) {

  const socketRef = useRef<Socket | null>(null)


  // const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [orders, setOrders] = useState<IOrder[]>(initialOrders || [])

  useEffect(() => {
    if (socketRef.current) return

    // Conectar ao servidor Socket.IO
    const socket = io('http://localhost:3333', {
      auth: { token: authorization },
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
    })

    socketRef.current = socket

    const onConnect = () => setIsConnected(true)
    const onDisconnect = () => setIsConnected(false)

    socket.on('connect', onConnect)

    socket.on('disconnect', onDisconnect)

    socket.on('message', (message: string) => {
      console.log('Mensagem recebida:', message)
    })

    const onCreated = (order: IOrder) => {
      setOrders((prev) => [...prev, order])
    }

    const onUpdated = (order: IOrder) => {
      setOrders((prev) =>
        prev.map((o) => (o.id === order.id ? order : o)),
      )
    }

    const onDeleted = (order: IOrder) => {
      setOrders((prev) => prev.filter((o) => o.id !== order.id))
    }

    // Evento: pedido criado
    socket.on(EVENTS.CREATED, onCreated)

    // Evento: pedido atualizado
    socket.on(EVENTS.UPDATED, onUpdated)

    // Evento: pedido deletado
    socket.on(EVENTS.DELETED, onDeleted)

    // setSocket(socketInstance)

    // Cleanup: desconectar quando o componente for desmontado
    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off(EVENTS.CREATED, onCreated)
      socket.off(EVENTS.UPDATED, onUpdated)
      socket.off(EVENTS.DELETED, onDeleted)

      socket.disconnect()
      socketRef.current = null
    }
  }, [authorization])

  return {
    socket: socketRef.current,
    isConnected,
    orders,
  }
}