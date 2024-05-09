import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { environment } from '../../environments/environment';
// impot button module primeng
import { ButtonModule } from 'primeng/button';
import { StorageService } from '../services/storage/storage.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  content?: string;
  isLoggedIn = this.storageService.isLoggedIn();

  test = environment.test;
  constructor(
    private userService: UserService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.userService.getPublicContent().subscribe({
      next: (data) => {
        this.content = data;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        // console.log('Completed');
      },
    });
  }
}
