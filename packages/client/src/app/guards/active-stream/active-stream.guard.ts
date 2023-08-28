import { ActivatedRouteSnapshot, CanDeactivateFn, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

export const activeStreamGuard: CanDeactivateFn<ComponentCanDeactivate> = (component: ComponentCanDeactivate, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot): boolean | Observable<boolean> => {
  return component.canDeactivate ? component.canDeactivate() : confirm('WARNING: Leaving this page will end the current broadcast.');
};
