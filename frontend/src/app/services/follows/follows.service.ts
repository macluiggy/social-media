import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class FollowsService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient, private authService: AuthService) {}

  checkIfFollowing(otherUserId: number) {
    const loggedInUserId = this.authService.getLoggedInUserFromStorage().id;
    console.log('loggedInUserId', loggedInUserId, otherUserId);
    
    // {{base_url}}/follows/user/1/following/2
    return this.http.get(
      `${this.apiUrl}/follows/user/${loggedInUserId}/following/${otherUserId}`
    );
  }

  followUser(otherUserId: number) {
    const loggedInUserId = this.authService.getLoggedInUserFromStorage().id;
    return this.http.post(
      `${this.apiUrl}/follows/user/${loggedInUserId}/follow/${otherUserId}`,
      {}
    );
  }

  unfollowUser(otherUserId: number) {
    const loggedInUserId = this.authService.getLoggedInUserFromStorage().id;
    return this.http.delete(
      `${this.apiUrl}/follows/user/${loggedInUserId}/unfollow/${otherUserId}`
    );
  }
}
