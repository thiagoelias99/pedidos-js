import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server } from 'socket.io'
import { OrderView } from './view/order.view'

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class OrdersGateway {
  @WebSocketServer()
  server: Server

  emitOrderCreated(order: OrderView) {
    this.server.emit('orderCreated', order)
  }

  emitOrderUpdated(order: OrderView) {
    this.server.emit('orderUpdated', order)
  }

  emitOrderDeleted(order: OrderView) {
    this.server.emit('orderDeleted', order)
  }
}
