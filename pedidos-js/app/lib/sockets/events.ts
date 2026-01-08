import { IOrder } from "@/app/actions/orders/get-orders"

// eventos que o FRONT RECEBE
export interface ServerToClientEvents {
  orderCreated: (order: IOrder) => void
  orderUpdated: (order: IOrder) => void
  orderDeleted: (order: IOrder) => void
}

// eventos que o FRONT ENVIA
export interface ClientToServerEvents {
  orderJoin: (payload: { orderId: string }) => void
}
