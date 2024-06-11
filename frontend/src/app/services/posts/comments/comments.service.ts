import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  apiUrl = environment.apiUrl;
  commentApiUrl = `${this.apiUrl}/post-comments`;
  constructor(private http: HttpClient) {}

  getPostComments(postId: number) {
    return this.http.get(`${this.commentApiUrl}/post/${postId}`);
  }
}
