import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { OrderView } from './view/order.view'

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class OrdersGateway {
  @WebSocketServer()
  server: Server

  handleConnection(client: Socket) {
    /**
     * Exemplo simples:
     * frontend envia role no handshake
     * depois você troca isso por JWT sem mudar a arquitetura
     */
    // console.log('Novo cliente conectado:', client.id)
    // console.log('Handshake auth:', client)

    const authorization = client.handshake.auth.token
    client.data.authorization = authorization

    // aqui pode fazer várias lógicas de autorização e incluir o cliente em salas específicas
    // se for admin, entra na sala dos admins
    if (authorization === 'admin') {
      client.join('role:admin')
      console.log(`Cliente conectado como admin`)
    } else {
      console.log(`Cliente conectado sem role`)
    }

    // enviar mensagem de boas-vindas para o cliente conectado
    client.emit('message', 'Conexão estabelecida com sucesso!')
  }

  handleDisconnect(client: Socket) {
    console.log('Cliente desconectado:', client.id)
  }

  emitOrderCreated(order: OrderView) {
    // Emite para todos os clientes conectados
    this.server.emit('orderCreated', order)
  }

  emitOrderUpdated(order: OrderView) {
    // Emite para todos os clientes conectados
    this.server.emit('orderUpdated', order)
  }

  emitOrderDeleted(order: OrderView) {
    // Emite apenas para clientes na sala de admins
    this.server.to('role:admin').emit('orderDeleted', order)
  }
}
