import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { StorageService } from './storage/storage.service';
import { DEFAULT_THEME } from '../common/constants';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private storageService: StorageService
  ) {
    this.setDefaultTheme();
  }

  getTheme() {
    return this.storageService.getTheme();
  }

  setDefaultTheme() {
    let theme = this.storageService.getTheme();
    if (theme) {
      this.switchTheme(theme);
    } else {
      this.storageService.setTheme(DEFAULT_THEME);
    }
  }
  switchTheme(theme: string) {
    this.storageService.setTheme(theme);
    let themeLink = this.document.getElementById(
      'app-theme'
    ) as HTMLLinkElement;
    themeLink.href = `${theme}.css`;
  }
}
