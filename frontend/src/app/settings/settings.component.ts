import { Component } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabView } from 'primeng/tabview';

@Component({
  selector: 'app-settings',
  standalone: true,
  providers: [TabView,],
  imports: [TabViewModule, TabMenuModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {}
