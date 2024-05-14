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
import { StorageService } from '../services/storage/storage.service';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

const POST_MENU_ITEMS = {
  DELETE: 'delete',
  SAVE: 'save',
};
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
    MenuModule,
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit, OnDestroy {
  @Input() posts: TPostWithUser[] = [] as TPostWithUser[];
  firstLoad = true;
  @Input() loading: boolean;
  loggedInUser = this.storageService.getUser();
  postMenuItems: MenuItem[] = [];

  constructor(
    private postsService: PostsService,
    private storageService: StorageService
  ) {
    this.loading = true;
    this.postMenuItems = [
      {
        id: POST_MENU_ITEMS.DELETE,
        label: 'Delete',
        icon: 'pi pi-trash',
      },
      {
        id: POST_MENU_ITEMS.SAVE,
        label: 'Save',
        icon: 'pi pi-save',
      },
    ];
  }
  ngOnDestroy(): void {
    console.log(`
  ngOnDestroy is for cleaning up any subscriptions or other resources before the component is destroyed.
  a component is destroyed when it is removed from the DOM. that can happen when the user navigates to a different route or when the user closes the browser tab.
    `);
  }

  ngOnInit() {}

  isLoggedInUserPost(post: TPostWithUser) {
    const isUserPost = post.userId === this.loggedInUser.id;
    this.postMenuItems.find(
      (item) => item.id === POST_MENU_ITEMS.DELETE
    )!.visible = isUserPost;
    return isUserPost;
  }
}
