import { Component } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { TabView, TabViewModule } from 'primeng/tabview';
import { FollowingComponent } from '../following/following.component';
import { FollowersComponent } from '../followers/followers.component';

@Component({
  selector: 'app-follows',
  standalone: true,
  providers: [TabView],
  imports: [DialogModule, TabViewModule, FollowersComponent, FollowingComponent],
  templateUrl: './follows.component.html',
  styleUrl: './follows.component.scss',
})
export class FollowsComponent {}
