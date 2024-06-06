import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-like-button',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './like-button.component.html',
  styleUrl: './like-button.component.scss'
})
export class LikeButtonComponent {
  liked = true;
  likePost() {
    // Like the post
  }
}
