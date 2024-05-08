import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { environment } from '../../environments/environment';
// impot button module primeng
import {ButtonModule} from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  content?: string

  test = environment.test;
  constructor(private userService: UserService) {}

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
