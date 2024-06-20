import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../../common/types/messages.type';
import { SocketService } from '../../services/socket/socket.service';
import { MessagesService } from '../../services/messages/messages.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent implements OnInit {
  loggedInUser = this.authService.getLoggedInUserFromStorage();
  loggedInUserId = this.loggedInUser?.id;
  senderId = this.loggedInUserId as number;
  receiverId: number = this.activatedRoute.snapshot.params['receiverId'];
  messages: Message[] = [];
  newMessage: string = '';
  username: string = 'User';

  constructor(
    private socketService: SocketService,
    private messageService: MessagesService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
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
