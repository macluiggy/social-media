import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-post', 
  standalone: true,
  imports: [DialogModule, ButtonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss',
})
export class CreatePostComponent {
  value = false;
  postForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.postForm = this.fb.group({
      title: '',
      content: '',
    });
  }
  // ngOnInit(): void {
  //     this.postForm = this.fb.group({
  //       title: '',
  //       content: '',
  //     });
  // }

  onSubmit() {}
}
