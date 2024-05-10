import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostsService } from '../services/posts/posts.service';
import { CardModule } from 'primeng/card';
import { RandomPosts } from './posts.type';
import { CommonModule, NgFor } from '@angular/common';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    CardModule,
    CommonModule,
    NgFor,
    VirtualScrollerModule,
    InfiniteScrollModule,
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit, OnDestroy {
  randomPosts: RandomPosts[] = [
    {
      content: 'content',
      title: 'title',
      user: {
        fullName: 'fullName',
        username: 'username',
      },
    },
  ] as RandomPosts[];
  private page = 1;
  private limit = 5;

  constructor(private postsService: PostsService) {
    this.fetchPosts();
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {}

  private fetchPosts() {
    this.postsService.getRandomPosts({ limit: 5, page: this.page }).subscribe({
      next: (response: any) => {
        this.randomPosts = [...this.randomPosts, ...response.data.items];
        this.page++;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  onScroll() {
    this.fetchPosts();
  }
}
