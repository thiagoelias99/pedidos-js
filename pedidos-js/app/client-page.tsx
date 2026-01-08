"use client"

import { IOrder } from "./actions/orders/get-orders"
import { useOrders } from "./hooks/useOrders"

interface ClientPageProps {
  orders: IOrder[]
}

export default function ClientPage({ orders }: ClientPageProps) {
  const { isConnected, orders: socketOrders } = useOrders({ initialOrders: orders })

  return (
    <div>
      <h2>Client Page</h2>
      <p>WebSocket status: {isConnected ? 'Connected' : 'Disconnected'}</p>
      <h3>Orders:</h3>
      <pre>{JSON.stringify(socketOrders, null, 2)}</pre>
    </div>
  )
}
