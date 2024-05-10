import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getRandomPosts({ limit = 10, page = 1 }) {
    return this.http.get(`${this.apiUrl}/posts/random`, {
      params: {
        limit,
        page,
      },
    });
  }
}
