import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../../modules/auth/services/auth.service';

export const userAuthGuard: CanActivateFn = () => {
  return inject(AuthService).userIsAuthenticated()
};
