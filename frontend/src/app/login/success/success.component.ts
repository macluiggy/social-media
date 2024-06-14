import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [],
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss',
})
export class SuccessComponent {
  token = this.activeRoute.snapshot.queryParams['token'];
  constructor(
    private activeRoute: ActivatedRoute,
    private storageService: StorageService,
    private authService: AuthService
  ) {
    if (this.token) {
      this.storageService.setToken(this.token);
      this.authService.validateAndStoreUser().subscribe();
    }
  }
}
