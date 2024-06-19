import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket/socket.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss',
})
export class MessagesComponent implements OnInit {
  messages: { sender: string; content: string }[] = [
    {
      sender: 'Admin',
      content: 'Welcome to the chat!',
    },
  ];
  newMessage: string = '';
  username: string = 'User';

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    this.socketService.onMessage().subscribe((message) => {
      this.messages.push(message);
      console.log('received message:', message);
      
    });
  }

  sendMessage(): void {
    const message = { sender: this.username, content: this.newMessage };
    this.socketService.sendMessage(message);
    this.newMessage = '';
  }
}
