import { HttpClient } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FollowsService } from '../../services/follows/follows.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-follow-button',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './follow-button.component.html',
  styleUrl: './follow-button.component.scss',
})
export class FollowButtonComponent implements OnChanges {
  @Input() userId!: number;
  isFollowing = false;
  loggedInUser = this.authService.getLoggedInUserFromStorage();
  currentUserIsLoggedInUser = this.userId == this.loggedInUser?.id;
  isLoggedIn = this.authService.userIsLoggedIn();
  @Output() follow = new EventEmitter();
  @Output() unfollow = new EventEmitter();

  constructor(
    private followService: FollowsService,
    private authService: AuthService
  ) {
    this.checkIfFollowing();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userId'] && this.userId) {
      this.checkIfFollowing();
    }
  }

  checkIfFollowing() {
    if (!this.userId || !this.authService.userIsLoggedIn()) return;

    this.followService.checkIfFollowing(this.userId).subscribe((res: any) => {
      this.isFollowing = res.data;
    });
  }

  followUser() {
    this.followService.followUser(this.userId).subscribe(() => {
      this.isFollowing = true;
      this.follow.emit();
    });
  }

  unfollowUser() {
    this.followService.unfollowUser(this.userId).subscribe(() => {
      this.isFollowing = false;
      this.unfollow.emit();
    });
  }
}
