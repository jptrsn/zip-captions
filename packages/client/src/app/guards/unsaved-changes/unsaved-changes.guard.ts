import { ActivatedRouteSnapshot, CanDeactivateFn, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ComponentCanDeactivate } from '../active-stream/active-stream.guard';

export const unsavedChangesGuard: CanDeactivateFn<ComponentCanDeactivate> = (component: ComponentCanDeactivate, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot): boolean | Observable<boolean> => {
  return component.canDeactivate ? component.canDeactivate() : confirm('You have unsaved changes, are you sure you want to leave?');
};
