import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { UserService } from '../services/user/user.service';
import { User } from '../common/types';
import { CardModule } from 'primeng/card';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CardModule,
    FileUploadModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  @ViewChild('profileImage') profileImage: any;
  userId: number = 0;

  profileForm: FormGroup;
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {
    this.profileForm = new FormGroup({
      firstName: new FormControl(null),
      lastName: new FormControl(null),
      email: new FormControl(null),
      password: new FormControl(null),
      username: new FormControl(null),
      // profile picture is a file
      profileImage: new FormControl(null, {}),
    });
  }

  onSubmit() {
    const formData = new FormData();
    const updateUserData = this.profileForm.value;

    // Append all properties of updateUserData except the file to formData
    for (const key in updateUserData) {
      if (updateUserData.hasOwnProperty(key) && key !== 'profileImage') {
        formData.append(key, updateUserData[key]);
      }
    }

    // Append the file separately
    if (this.profileForm.get('profileImage')?.value) {
      formData.append(
        'profileImage',
        this.profileForm.get('profileImage')?.value
      );
    }

    this.authService.signUp(formData).subscribe({
      next: (res: any) => {
        this.authService.updateLoggedInUser(res.data);
        this.profileImage.clear();
      },
    });
  }

  onSelect(event: any) {
    for (const file of event.files) {
      this.profileForm.patchValue({
        profileImage: file,
      });
      this.profileForm.get('profileImage')?.updateValueAndValidity();
    }
  }
}
