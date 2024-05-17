import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { StorageService } from '../services/storage/storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.userIsLoggedIn()) {
    return true;
  }

  authService.logout();
  return router.navigate(['/login']);
};
