import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage/storage.service';
import { ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';
import { PostsService } from '../services/posts/posts.service';
import { TPost } from '../posts/posts.type';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CardModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  currentUser: any;
  userId: number;
  userPosts: TPost[] = [];

  constructor(
    private storageService: StorageService,
    private activatedRoute: ActivatedRoute,
    private postsService: PostsService
  ) {
    this.userId = this.activatedRoute.snapshot.params['userId'];
    this.currentUser = this.storageService.getUser();

    if (!this.currentUser.profilePhoto) {
      this.currentUser.profilePhoto =
        'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png';
    }

    this.getUserPosts();
  }

  getUserPosts() {
    this.postsService.getUserPosts({ userId: this.userId }).subscribe({
      next: (res: any) => {
        console.log(res);
        this.userPosts = res.data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
