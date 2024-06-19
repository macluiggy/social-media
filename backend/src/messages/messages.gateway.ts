import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { CORS_ORIGINS } from '../common/constants';

@WebSocketGateway({
  cors: {
    origin: CORS_ORIGINS,
    methods: ['GET', 'POST'],
  },
})
export class MessagesGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('sendMessage')
  handleMessage(
    @MessageBody() message: { sender: string; content: string },
  ): void {
    console.log('Message received:', message);

    this.server.emit('receiveMessage', message);
  }
}
