import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';
import { ComponentCanDeactivate, activeStreamGuard } from './active-stream.guard';

describe('activeStreamGuard', () => {
  const executeGuard: CanDeactivateFn<ComponentCanDeactivate> = (...guardParameters) => 
      TestBed.runInInjectionContext(() => activeStreamGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
