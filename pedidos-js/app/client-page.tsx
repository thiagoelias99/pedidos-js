"use client"

import { IOrder } from "./actions/orders/get-orders"
import { useOrdersSocket } from "./hooks/useOrdersSocket"

interface ClientPageProps {
  orders: IOrder[]
}

export default function ClientPage({ orders }: ClientPageProps) {
  const { orders: socketOrders, isConnected } = useOrdersSocket({ initialOrders: orders, authorization: "admin" })

  return (
    <div>
      <h2>Client Page</h2>
      <p>WebSocket status: {isConnected ? 'Connected' : 'Disconnected'}</p>
      <h3>Orders:</h3>
      <pre>{JSON.stringify(socketOrders, null, 2)}</pre>
    </div>
  )
}
