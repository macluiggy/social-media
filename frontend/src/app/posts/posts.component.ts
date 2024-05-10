import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostsService } from '../services/posts/posts.service';
import { CardModule } from 'primeng/card';
import { SuccessResponse } from '../common/types';
import { RandomPosts } from './posts.type';
import { CommonModule, NgFor } from '@angular/common';
import { throttleTime, filter, map, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CardModule, CommonModule, NgFor],
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
  private scrollSubscription: Subscription;

  constructor(private postsService: PostsService) {
    this.fetchPosts();
    this.scrollSubscription = fromEvent(window, 'scroll')
      .pipe(
        throttleTime(1000),
        filter(
          () =>
            window.innerHeight + window.scrollY >= document.body.offsetHeight
        ),
        tap(() => this.fetchPosts())
      )
      .subscribe();
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {}

  private fetchPosts() {
    console.log('fetching posts');
    
    this.postsService.getRandomPosts({ limit: 5, page: this.page }).subscribe({
      next: (response: any) => {
        this.randomPosts = [
          ...this.randomPosts,
          ...(response.data.items as RandomPosts[]),
        ];
        this.page++;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
