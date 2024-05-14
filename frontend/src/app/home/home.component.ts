import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { environment } from '../../environments/environment';
// impot button module primeng
import { ButtonModule } from 'primeng/button';
import { StorageService } from '../services/storage/storage.service';
import { PostsComponent } from '../posts/posts.component';
import { TPostWithUser } from '../posts/posts.type';
import { PostsService } from '../services/posts/posts.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule, PostsComponent, InfiniteScrollModule, ProgressSpinnerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  content?: string;
  isLoggedIn = this.storageService.isLoggedIn();
  randomPosts: TPostWithUser[] = [] as TPostWithUser[];
  loading = false;
  private page = 1;
  

  test = environment.test;
  constructor(
    private userService: UserService,
    private storageService: StorageService,
    private postsService: PostsService
  ) {
    this.fetchPosts();
  }

  ngOnInit(): void {
    this.userService.getPublicContent().subscribe({
      next: (data) => {
        this.content = data;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
      },
    });
  }

  private fetchPosts() {
    this.loading = true;
    this.postsService.getRandomPosts({ limit: 5, page: this.page }).subscribe({
      next: (response: any) => {
        this.randomPosts = [...this.randomPosts, ...response.data.items];
        
        this.page++;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  onScroll() {
    this.fetchPosts();
  }
}
