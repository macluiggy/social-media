import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { CORS_ORIGINS } from '../common/constants';
import { MessagesService } from './messages.service';

@WebSocketGateway({
  cors: {
    origin: CORS_ORIGINS,
    methods: ['GET', 'POST'],
  },
})
export class MessagesGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messagesService: MessagesService) {}
  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody()
    message: {
      senderId: number;
      receiverId: number;
      content: string;
    },
  ) {
    console.log('Message received:', message);
    // const { senderId, receiverId } = message;
    this.server.emit('receiveMessage', message);
  }
}
