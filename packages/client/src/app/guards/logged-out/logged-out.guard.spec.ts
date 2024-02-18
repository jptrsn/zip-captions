import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { loggedOutGuard } from './logged-out.guard';

describe('loggedOutGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => loggedOutGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
