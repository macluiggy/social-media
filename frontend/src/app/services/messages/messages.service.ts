import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  apiUrl = environment.apiUrl;
  messageApiUrl = `${this.apiUrl}/messages`;
  constructor(private http: HttpClient, private authService: AuthService) {}

  getMessages(
    senderId: number,
    receiverId: number,
  ) {
    return this.http.get(`${this.messageApiUrl}/sender/${senderId}/receiver/${receiverId}`);
  }
}
