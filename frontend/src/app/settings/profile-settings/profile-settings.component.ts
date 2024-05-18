import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { User } from '../../common/types';
// import for <p-inputText
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-profile-settings',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    FileUploadModule,
  ],
  templateUrl: './profile-settings.component.html',
  styleUrl: './profile-settings.component.scss',
})
export class ProfileSettingsComponent {
  @ViewChild('profilePicture') profilePicture: any;

  profileForm: FormGroup;
  constructor(private authService: AuthService) {
    this.profileForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      id: new FormControl(''),
      username: new FormControl(''),
      // profile picture is a file
      profilePicture: new FormControl('', {}),
    });
    authService.getLoggedInUser().subscribe({
      next: (res: any) => {
        const user: User = res.data;

        this.profileForm.patchValue(user);
      },
    });
  }

  onSubmit() {
    console.log(this.profileForm.value);
  }

  onSelect(event: any) {
    console.log(this.profileForm.value);

    for (const file of event.files) {
      this.profileForm.patchValue({
        profilePicture: file,
      });
      this.profileForm.get('profilePicture')?.updateValueAndValidity();
    }

    console.log(this.profileForm.value);
  }
}
