import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../modules/auth/services/auth.service';

export const userAuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  if (inject(AuthService).userIsAuthenticated()) {
    return true;
  }
  inject(Router).navigate(['auth', 'login'])
  return false
};
