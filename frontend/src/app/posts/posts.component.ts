import { Component } from '@angular/core';
import { PostsService } from '../services/posts/posts.service';
import { CardModule } from 'primeng/card';
import { SuccessResponse } from '../common/types';
import { RandomPosts } from './posts.type';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CardModule, CommonModule, NgFor],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent {
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

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.postsService.getRandomPosts({ limit: 5, page: 1 }).subscribe({
      next: (response: any) => {
        this.randomPosts = response.data.items as RandomPosts[];
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
