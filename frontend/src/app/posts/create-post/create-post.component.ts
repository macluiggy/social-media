import { Component } from '@angular/core';
import {DialogModule} from 'primeng/dialog';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss'
})
export class CreatePostComponent {
  displayCreatePostDialog = false;
}
