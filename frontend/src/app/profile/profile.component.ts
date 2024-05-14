import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage/storage.service';
import { ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';
import { PostsService } from '../services/posts/posts.service';
import { TPost, TPostWithUser } from '../posts/posts.type';
// import module for p-tabPanel
import { TabView, TabViewModule } from 'primeng/tabview';
// also for p-tabMenu
import { TabMenuModule } from 'primeng/tabmenu';
import { PostsComponent } from '../posts/posts.component';
import { UserService } from '../services/user/user.service';
import { User } from '../types';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-profile',
  providers: [TabView, PostsComponent],
  standalone: true,
  imports: [
    CardModule,
    TabViewModule,
    TabMenuModule,
    PostsComponent,
    InfiniteScrollModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  loggedInUser: User | null = this.storageService.getUser();
  currentUser: User | null = null;
  userId: number;
  userPosts: TPostWithUser[] = [];
  loading = false;
  page = 1;
  limit = 2;

  constructor(
    private activatedRoute: ActivatedRoute,
    private postsService: PostsService,
    private userService: UserService,
    private storageService: StorageService
  ) {
    this.userId = this.activatedRoute.snapshot.params['userId'];

    this.getUserInfo();
    this.getUserPosts();
  }

  getUserInfo() {
    this.userService.getUserByUserId(this.userId).subscribe({
      next: (res: any) => {
        this.currentUser = res.data;
        if (!this.currentUser!.profilePhoto) {
          this.currentUser!.profilePhoto =
            'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png';
        }
        this.getUserPosts();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  getUserPosts() {
    this.loading = true;
    this.postsService
      .getUserPosts({ userId: this.userId, page: this.page++, limit: this.limit })
      .subscribe({
        next: (res: any) => {
          this.userPosts = [...this.userPosts, ...res.data.items];
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          this.loading = false;
        },
      });
  }

  onScroll() {
    this.getUserPosts();
  }
}
