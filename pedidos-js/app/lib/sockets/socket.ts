import { io, Socket } from 'socket.io-client'
import {
  ServerToClientEvents,
  ClientToServerEvents,
} from './events'

export type AppSocket = Socket<
  ServerToClientEvents,
  ClientToServerEvents
>

export function createSocket(token?: string): AppSocket {
  console.log('Creating socket with token:', token)

  return io('http://localhost:3333', {
    auth: { token },
    transports: ['websocket'],
    reconnection: true,
  })
}
