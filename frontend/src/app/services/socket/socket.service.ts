import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io(environment.baseUrl);
  }

  sendMessage(message: { sender: string; content: string }): void {
    this.socket.emit('sendMessage', message);
  }

  onMessage(): Observable<{ sender: string; content: string }> {
    return new Observable((observer) => {
      this.socket.on('receiveMessage', (message) => {
        observer.next(message);
      });
    });
  }
}
