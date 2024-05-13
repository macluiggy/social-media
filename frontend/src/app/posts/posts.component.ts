import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostsService } from '../services/posts/posts.service';
import { CardModule } from 'primeng/card';
import { RandomPosts } from './posts.type';
import { CommonModule, NgFor } from '@angular/common';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CustomProgressLoadingComponent } from '../custom-progress-loading/custom-progress-loading.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    CardModule,
    CommonModule,
    NgFor,
    VirtualScrollerModule,
    InfiniteScrollModule,
    CustomProgressLoadingComponent,
    ProgressSpinnerModule,
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit, OnDestroy {
  randomPosts: RandomPosts[] = [] as RandomPosts[];
  private page = 1;
  private limit = 5;
  firstLoad = true;
  loading = false;

  constructor(private postsService: PostsService) {
    this.fetchPosts();
  }
  ngOnDestroy(): void {
    console.log(`
  ngOnDestroy is for cleaning up any subscriptions or other resources before the component is destroyed.
  a component is destroyed when it is removed from the DOM. that can happen when the user navigates to a different route or when the user closes the browser tab.
    `);
  }

  ngOnInit() {}

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
        this.firstLoad = false;
      },
    });
  }

  onScroll() {
    this.fetchPosts();
  }
}
