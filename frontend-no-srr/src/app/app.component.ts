import { Component, Inject, Renderer2, RendererFactory2 } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CommonModule, DOCUMENT } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from './services/storage/storage.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    NavBarComponent,
    RouterLink,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontend';
  themeSelection: boolean = false;
  private renderer: Renderer2;

  constructor(
    private translate: TranslateService,
    @Inject(DOCUMENT) private document: Document,
    private storageService: StorageService,
    private rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);

    this.changeTheme('dark');
    // let theme = this.storageService.getTheme();
    // console.log('theme', theme);

    // if (theme) {
    //   this.themeSelection = theme === 'dark' ? true : false;
    //   this.changeTheme('dark');
    // } else {
    //   this.themeSelection = false;
    //   this.changeTheme('dark');
    // }
    translate.setDefaultLang('es');
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  changeTheme(state: string) {
    // let theme = state === 'dark' ? 'dark' : 'light';
    // this.storageService.setTheme(theme);

    // let themeLink = document.getElementById('app-theme') as HTMLLinkElement;
    // themeLink.href = `lara-${theme}-blue.css`;
    let theme = state === 'dark' ? 'light' : 'light';
    this.storageService.setTheme('light');

    let themeLink = this.document.getElementById('app-theme') as HTMLLinkElement;
    console.log('themeLink', themeLink);
    
    
    // this.renderer.setAttribute(themeLink, 'href', `lara-${theme}-blue.css`);

    // this.themeSelection = state === 'dark' ? true : false;
    themeLink.href = './dark.css';
     
  }
}
