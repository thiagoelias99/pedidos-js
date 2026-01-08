"use server"

export interface IOrder {
  id: string
  title: string
  status: string
  createdAt: Date
}

export async function getOrders() {
  const res = await fetch('http://localhost:3333/orders', {
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Failed to fetch orders')
  }

  const orders = await res.json() as IOrder[]
  return orders.map(order => ({
    ...order,
    createdAt: new Date(order.createdAt),
  }))
}