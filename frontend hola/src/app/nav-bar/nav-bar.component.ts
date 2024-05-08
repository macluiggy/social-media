import { Component } from '@angular/core';
import { StorageService } from '../services/storage/storage.service';
import { AuthService } from '../services/auth/auth.service';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MenubarModule } from 'primeng/menubar';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    RouterModule,
    TranslateModule,
    MenubarModule,
    CommonModule,
    AvatarModule,
    BadgeModule,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  title = 'frontend';
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  items: MenuItem[];

  constructor(
    private storageService: StorageService,
    private authService: AuthService
  ) {
    this.items = [
      {
        label: 'Home',
        routerLink: 'home',
      },
      {
        label: 'Admin Board',
        routerLink: 'admin',
        visible: this.showAdminBoard,
      },
      {
        label: 'User Board',
        routerLink: 'user',
      },
      {
        label: 'Profile',
        routerLink: 'profile',
      },
      {
        label: 'Login',
        routerLink: 'login',
        visible: !this.isLoggedIn,
      },
      {
        label: 'Register',
        routerLink: 'register',
        visible: !this.isLoggedIn,
      },
      {
        label: 'Logout',
        command: () => this.logout(),
        visible: this.isLoggedIn,
      },
      // Add more menu items as needed...
    ];
  }

  ngOnInit(): void {
    this.authService.getIsLoggedIn().subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      this.username = this.storageService.getUser().username;
    });
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();

      this.username = user.username;
    }
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: (res) => {
        this.storageService.clean();
        this.authService.setIsLoggedIn(false);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
