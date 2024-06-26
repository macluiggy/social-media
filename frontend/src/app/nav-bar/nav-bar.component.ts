import { Component } from '@angular/core';
import { StorageService } from '../services/storage/storage.service';
import { AuthService } from '../services/auth/auth.service';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MenubarModule } from 'primeng/menubar';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { MegaMenuModule } from 'primeng/megamenu';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { CreatePostComponent } from '../posts/create-post/create-post.component';
import { UserService } from '../services/user/user.service';
import { User } from '../common/types';
import { SwitchThemeComponent } from './switch-theme/switch-theme.component';

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
    MegaMenuModule,
    SidebarModule,
    ButtonModule,
    MenuModule,
    ToastModule,
    DialogModule,
    CreatePostComponent,
    SwitchThemeComponent,
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
  showProfileMenu = false;
  megaMenuItems: MegaMenuItem[] = [];
  sidebarVisible = false;
  pMenuItems: MenuItem[];
  displayCreatePostDialog = false;
  userId: number;
  loggedInUser: User | null = this.storageService.getUser();
  P_MENU_ITEMS_IDS = {
    PROFILE: 'Profile',
    LOGOUT: 'Logout',
    SETTINGS: 'Settings',
    SWITCH_THEME: 'Switch Theme',
  };

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {
    this.userId = this.storageService.getUser()?.id as number;

    this.pMenuItems = [
      {
        id: this.P_MENU_ITEMS_IDS.PROFILE,
        label: 'Profile',
        icon: 'pi pi-fw pi-user',
        routerLink: `profile/user/${this.userId}`,
        visible: false,
      },
      {
        id: this.P_MENU_ITEMS_IDS.LOGOUT,
        label: 'Logout',
        icon: 'pi pi-fw pi-sign-out',
        command: () => this.logout(),
        visible: false,
      },
      {
        id: this.P_MENU_ITEMS_IDS.SETTINGS,
        label: 'Settings',
        icon: 'pi pi-fw pi-cog',
        routerLink: 'settings',
        visible: false,
      },
      {
        id: this.P_MENU_ITEMS_IDS.SWITCH_THEME,
        label: 'Switch Theme',
        icon: 'pi pi-fw pi-palette',
        // command: () => this.switchTheme(),
        visible: false,
      },
    ];
    this.authService.loggedInUser$.subscribe((user) => {
      if (user) {
        this.userId = user.id;
        this.updatePMenusItems();
        this.loggedInUser = user;
      }
    });
    if (this.isLoggedIn) {
      this.refreshUserInfo();
    }
  }

  refreshUserInfo(): void {
    this.userService.getUserByUserId(this.userId).subscribe({
      next: (res: any) => {
        const previousUser = this.storageService.getUser();
        const user: User = res.data;
        const newUser = { ...previousUser, ...user };
        this.storageService.saveUser(newUser);
      },
    });
  }

  updatePMenusItems(): void {
    const profileItem = this.pMenuItems.find(
      (item) => item.label === 'Profile'
    );
    if (profileItem) {
      profileItem.routerLink = `profile/user/${this.userId}`;
    }
  }

  ngOnInit(): void {
    this.authService.getIsLoggedIn().subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      this.username = this.authService.getLoggedInUserFromStorage()?.username;
    });
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.userId = user?.id as number;
      this.updatePMenusItems();

      this.username = user?.username;
    }
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  toggleProfileMenu(): void {
    this.showProfileMenu = !!this.showProfileMenu;
  }

  closeCallback(): void {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
