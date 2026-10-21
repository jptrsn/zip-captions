import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { unsavedChangesGuard } from './unsaved-changes.guard';

describe('unsavedChangesGuard', () => {
  const route = {} as ActivatedRouteSnapshot;
  const state = {} as RouterStateSnapshot;
  const run = (component: { canDeactivate?: () => boolean | Observable<boolean> }) =>
    unsavedChangesGuard(component as never, route, state, state);

  afterEach(() => jest.restoreAllMocks());

  it('asks the component whether it can be left', () => {
    expect(run({ canDeactivate: () => false })).toBe(false);
    expect(run({ canDeactivate: () => true })).toBe(true);
  });

  it('passes on an observable answer from the component', () => {
    const answer = of(true);
    expect(run({ canDeactivate: () => answer })).toBe(answer);
  });

  it('asks the user to confirm when the component cannot say', () => {
    const confirm = jest.spyOn(window, 'confirm').mockReturnValue(false);
    expect(run({})).toBe(false);
    expect(confirm).toHaveBeenCalledWith('You have unsaved changes, are you sure you want to leave?');
    confirm.mockReturnValue(true);
    expect(run({})).toBe(true);
  });
});
