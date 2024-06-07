import { Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { LikesService } from '../../services/likes/likes.service';
import { TPostWithUser } from '../posts.type';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-like-button',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './like-button.component.html',
  styleUrl: './like-button.component.scss',
})
export class LikeButtonComponent implements OnInit {
  liked = false;
  @Input() post: TPostWithUser = {} as TPostWithUser;
  postId: number;
  likesCount = 0;
  isLoggedIn = this.authService.userIsLoggedIn();
  constructor(
    private likesService: LikesService,
    private authService: AuthService
  ) {
    this.postId = this.post?.id;
  }

  ngOnInit(): void {
    this.postId = this.post?.id;
    if (this.isLoggedIn) {
      this.isLikedByLoggedInUser();
    }
    this.getLikes();
  }

  clickLikeButton() {
    if (this.liked) {
      this.unlikePost();
    } else {
      this.likePost();
    }
  }

  likePost() {
    // Like the post
    this.likesService.likePost(this.postId).subscribe({
      next: () => {
        this.isLikedByLoggedInUser();
        this.getLikes();
      },
    });
  }

  unlikePost() {
    // Unlike the post
    this.likesService.unlikePost(this.postId).subscribe({
      next: () => {
        this.isLikedByLoggedInUser();
        this.getLikes();
      },
    });
  }

  isLikedByLoggedInUser() {
    this.likesService.isLikedByLoggedInUser(this.postId).subscribe({
      next: (res: any) => {
        this.liked = res.data;
      },
    });
  }

  getLikes() {
    this.likesService.getLikes(this.postId).subscribe({
      next: (res: any) => {
        this.likesCount = res.data.total;
      },
    });
  }
}
