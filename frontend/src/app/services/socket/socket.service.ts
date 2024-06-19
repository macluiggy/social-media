import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Message } from '../../common/types/messages.type';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io(environment.baseUrl, {
      withCredentials: true,
      transports: ['websocket', 'polling'],
    });
  }

  sendMessage(message: Message): void {
    this.socket.emit('sendMessage', message);
  }

  onMessage(): Observable<Message> {
    return new Observable((observer) => {
      this.socket.on('receiveMessage', (message) => {
        observer.next(message);
      });
    });
  }
}
