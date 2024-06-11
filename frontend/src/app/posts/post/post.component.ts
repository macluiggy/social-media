import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TPostWithUser } from '../posts.type';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { PostsService } from '../../services/posts/posts.service';
import { StorageService } from '../../services/storage/storage.service';
import { MenuModule } from 'primeng/menu';
import { LikeButtonComponent } from '../like-button/like-button.component';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
const POST_MENU_ITEMS = {
  DELETE: 'delete',
  SAVE: 'save',
};
@Component({
  selector: 'app-post',
  standalone: true,
  providers: [ConfirmationService],
  imports: [CardModule, MenuModule, LikeButtonComponent, ButtonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit, OnChanges {
  post: TPostWithUser = {} as TPostWithUser;
  firstLoad = true;
  @Input() loading: boolean;
  loggedInUser = this.storageService.getUser();
  postMenuItems: MenuItem[] = [];
  currentPost: TPostWithUser | null = null;
  postId: number = this.route.snapshot.params['postId'];

  constructor(
    private postsService: PostsService,
    private storageService: StorageService,
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute
  ) {
    this.loading = true;
    this.postMenuItems = [
      {
        id: POST_MENU_ITEMS.DELETE,
        label: 'Delete',
        icon: 'pi pi-trash',
        command: (_event) => {
          if (this.currentPost) {
            this.deletePost(this.currentPost);
          }
        },
      },
      {
        id: POST_MENU_ITEMS.SAVE,
        label: 'Save',
        icon: 'pi pi-save',
      },
    ];
  }

  refreshPost() {
    this.loading = true;
    this.getPost(this.postId);
  }

  getPost(postId: number) {
    this.postsService.getPost(postId).subscribe({
      next: (res: any) => {
        const post = res.data;
        this.post = post;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  ngOnInit() {
    this.refreshPost();
  }

  ngOnChanges() {
    this.refreshPost();
  }

  /**
   * Check if the post is created by the logged in user, if so, show the options that are available to the logged in user
   * @param post
   * @returns
   */
  isLoggedInUserPost(post: TPostWithUser) {
    const isUserPost = post.userId === this.loggedInUser?.id;
    this.postMenuItems.find(
      (item) => item.id === POST_MENU_ITEMS.DELETE
    )!.visible = isUserPost;

    return isUserPost;
  }

  deletePost(post: TPostWithUser) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this post?',
      accept: () => {
        this.postsService.deletePost(post.id).subscribe(() => {
          // this.posts = this.posts.filter((p) => p.id !== post.id);
        });
      },
    });
  }
}
