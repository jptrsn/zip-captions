import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { dbInitializedGuard } from './db-initialized.guard';

describe('dbInitializedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => dbInitializedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
