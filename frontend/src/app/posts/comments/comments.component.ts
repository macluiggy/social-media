import { Component } from '@angular/core';
import { PostCommentWithRelations } from '../../common/types/post-commnets.type';
import { CommentsService } from '../../services/posts/comments/comments.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

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
  constructor(private commentsService: CommentsService) {
    this.getComments(1);
  }

  addComment() {
    console.log('add comment');
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
