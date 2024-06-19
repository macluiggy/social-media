import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket/socket.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessagesService } from '../services/messages/messages.service';
import { Message } from '../common/types/messages.type';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss',
})
export class MessagesComponent implements OnInit {
  senderId: number = 75;
  receiverId: number = 76;
  messages: Message[] = [];
  newMessage: string = '';
  username: string = 'User';

  constructor(
    private socketService: SocketService,

    private messageService: MessagesService
  ) {}

  ngOnInit(): void {
    this.socketService.onMessage().subscribe((message) => {
      this.messages.push(message);
    });
    this.getMessages();
  }

  getMessages(): void {
    this.messageService.getMessages(this.senderId, this.receiverId).subscribe({
      next: (res: any) => {
        this.messages = res.data;
      },
      error: (error) => {
        console.error('error:', error);
      },
    });
  }

  sendMessage(): void {
    const message: Message = {
      receiverId: this.receiverId,
      senderId: this.senderId,
      content: this.newMessage,
    };
    this.socketService.sendMessage(message);
    this.newMessage = '';
  }
}
