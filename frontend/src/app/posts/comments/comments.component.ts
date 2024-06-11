import { Component } from '@angular/core';
import { PostCommentWithRelations } from '../../common/types/post-commnets.type';
import { CommentsService } from '../../services/posts/comments/comments.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
})
export class CommentsComponent {
  comments: PostCommentWithRelations[] = [];
  loading = false;
  newComment = '';
  postId = this.router.snapshot.params['postId'];
  loggedInUser = this.authService.getLoggedInUserFromStorage();
  userId = this.loggedInUser?.id as number;
  constructor(
    private commentsService: CommentsService,
    private router: ActivatedRoute,
    private authService: AuthService
  ) {
    console.log(this.loggedInUser);

    this.getComments(this.postId);
  }

  addComment() {
    this.commentsService
      .addComment({
        postId: this.postId,
        content: this.newComment,
        parentCommentId: null,
        userId: this.userId,
      })
      .subscribe({
        next: (res: any) => {
          const newComment = {
            ...res.data,
            user: this.loggedInUser,
            showReplyForm: false,
          };
          this.comments.unshift(newComment);
          this.newComment = '';
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  addReply(comment: PostCommentWithRelations) {
    console.log('add reply', comment);
  }

  toggleReplyForm(comment: PostCommentWithRelations) {
    // console.log('toggle reply form', commentId);
    comment.showReplyForm = !comment.showReplyForm;
  }

  getComments(postId: number) {
    this.loading = true;
    this.commentsService.getPostComments(postId).subscribe({
      next: (res: any) => {
        this.comments = res.data.items;

        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
      },
    });
  }
}
