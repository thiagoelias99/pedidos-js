import { getOrders } from "./actions/orders/get-orders"
import ClientPage from "./client-page"

export default async function Home() {

  const orders = await getOrders()

  return (
    <div>
      <h1>Pedidos JS</h1>
      <ClientPage orders={orders} />
    </div>
  )
}
