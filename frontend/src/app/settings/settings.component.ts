import { Component } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabView } from 'primeng/tabview';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  providers: [TabView, ProfileComponent],
  imports: [TabViewModule, TabMenuModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {}
