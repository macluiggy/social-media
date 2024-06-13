import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ThemeService } from '../../services/theme.service';
import { DEFAULT_THEME, THEMES } from '../../common/constants';
@Component({
  selector: 'app-switch-theme',
  standalone: true,
  imports: [InputSwitchModule, FormsModule],
  templateUrl: './switch-theme.component.html',
  styleUrl: './switch-theme.component.scss',
})
export class SwitchThemeComponent {
  checked = this.themeService.getTheme() !== DEFAULT_THEME;
  constructor(private themeService: ThemeService) {}
  switchTheme() {
    this.themeService.switchTheme(this.checked ? THEMES.LIGHT : THEMES.DARK);
  }
}
