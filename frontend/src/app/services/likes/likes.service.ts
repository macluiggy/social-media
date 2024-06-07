import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LikesService {
  apiUrl = environment.apiUrl;
  likesUrl = `${this.apiUrl}/likes`;
  constructor(private http: HttpClient) {}

  likePost(postId: number) {
    // Like the post
    return this.http.post(`${this.likesUrl}`, { postId });
  }

  unlikePost(postId: number) {
    // Unlike the post
    return this.http.delete(`${this.likesUrl}/post/${postId}`);
  }

  getLikes(
    postId: number,
    options: { limit: number; page: number } = { limit: 10, page: 1 }
  ) {
    const queryParameters = {
      limit: options.limit.toString(),
      page: options.page.toString(),
    };
    // Get the likes for the post
    return this.http.get(`${this.likesUrl}/post/${postId}`, {
      params: queryParameters,
    });
  }

  isLikedByLoggedInUser(postId: number) {
    return this.http.get(`${this.likesUrl}/hasLiked/${postId}/`);
  }
}
