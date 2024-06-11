import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  apiUrl = environment.apiUrl;
  commentApiUrl = `${this.apiUrl}/post-comments`;
  constructor(private http: HttpClient) {}

  getPostComments(postId: number) {
    return this.http.get(`${this.commentApiUrl}/post/${postId}`);
  }

  addComment({
    postId,
    content,
    parentCommentId,
    userId,
  }: {
    postId: number;
    content: string;
    parentCommentId: number | null;
    userId: number;
  }) {
    return this.http.post(`${this.commentApiUrl}`, {
      postId,
      content,
      parentCommentId,
      userId,
    });
  }
}
