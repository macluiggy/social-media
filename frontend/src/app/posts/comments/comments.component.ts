import { Component } from '@angular/core';
import { PostCommentWithRelations } from '../../common/types/post-commnets.type';
import { CommentsService } from '../../services/posts/comments/comments.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule
  ],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
})
export class CommentsComponent {
  comments: PostCommentWithRelations[] = [];
  loadingAddComment = false;
  loadingAddReply = false;
  newComment = '';
  postId = this.router.snapshot.params['postId'];
  loggedInUser = this.authService.getLoggedInUserFromStorage();
  userId = this.loggedInUser?.id as number;
  isLoggedIn = this.authService.userIsLoggedIn();
  constructor(
    private commentsService: CommentsService,
    private router: ActivatedRoute,
    private authService: AuthService
  ) {

    this.getComments(this.postId);
  }

  addComment() {
    this.loadingAddComment = true;
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
        complete: () => {
          this.loadingAddComment = false;
        }
      });
  }

  addReply(comment: PostCommentWithRelations) {
    this.loadingAddReply = true;
    this.commentsService
      .addComment({
        postId: this.postId,
        content: comment.newReply as string,
        parentCommentId: comment.id,
        userId: this.userId,
      })
      .subscribe({
        next: (res: any) => {
          const newComment = {
            ...res.data,
            user: this.loggedInUser,
            showReplyForm: false,
          };
          if (!comment.childComments) {
            comment.childComments = [];
          }
          comment.childComments.unshift(newComment);
          comment.newReply = '';
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          this.loadingAddReply = false;
        }
      });
  }

  toggleReplyForm(comment: PostCommentWithRelations) {
    // console.log('toggle reply form', commentId);
    comment.showReplyForm = !comment.showReplyForm;
  }

  getComments(postId: number) {
    this.loadingAddComment = true;
    this.commentsService.getPostComments(postId).subscribe({
      next: (res: any) => {
        this.comments = res.data.items;

        this.loadingAddComment = false;
      },
      error: (error) => {
        console.error(error);
        this.loadingAddComment = false;
      },
    });
  }
}
