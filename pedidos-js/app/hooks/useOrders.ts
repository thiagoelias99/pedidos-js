import { useEffect, useState } from 'react'
import { useSocket } from "../lib/sockets/socket-context"
import { IOrder } from "../actions/orders/get-orders"

export function useOrders({ initialOrders }: { initialOrders?: IOrder[] } = {}) {
  const { socket, isConnected } = useSocket()
  const [orders, setOrders] = useState<IOrder[]>(initialOrders ?? [])

  useEffect(() => {
    if (!socket) return

    const onCreated = (order: IOrder) => {
      setOrders((prev) => [...prev, order])
    }

    const onUpdated = (order: IOrder) => {
      setOrders((prev) =>
        prev.map((o) => (o.id === order.id ? order : o)),
      )
    }

    const onDeleted = (order: IOrder) => {
      setOrders((prev) =>
        prev.filter((o) => o.id !== order.id),
      )
    }

    socket.on('orderCreated', onCreated)
    socket.on('orderUpdated', onUpdated)
    socket.on('orderDeleted', onDeleted)

    return () => {
      socket.off('orderCreated', onCreated)
      socket.off('orderUpdated', onUpdated)
      socket.off('orderDeleted', onDeleted)
    }
  }, [socket])

  return {
    orders,
    isConnected,
  }
}
