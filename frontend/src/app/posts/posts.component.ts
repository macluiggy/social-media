import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PostsService } from '../services/posts/posts.service';
import { CardModule } from 'primeng/card';
import { TPostWithUser } from './posts.type';
import { CommonModule, NgFor } from '@angular/common';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CustomProgressLoadingComponent } from '../custom-progress-loading/custom-progress-loading.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RouterModule } from '@angular/router';

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
    RouterModule,
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit, OnDestroy {
  @Input() posts: TPostWithUser[] = [] as TPostWithUser[];
  firstLoad = true;
  @Input() loading: boolean;

  constructor(private postsService: PostsService) {
    this.loading = true;
  }
  ngOnDestroy(): void {
    console.log(`
  ngOnDestroy is for cleaning up any subscriptions or other resources before the component is destroyed.
  a component is destroyed when it is removed from the DOM. that can happen when the user navigates to a different route or when the user closes the browser tab.
    `);
  }

  ngOnInit() {}
}
