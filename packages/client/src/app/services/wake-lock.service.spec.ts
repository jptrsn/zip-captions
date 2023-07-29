import { TestBed } from '@angular/core/testing';
import { WakeLockService } from './wake-lock.service';
import { TestingModuleProviders } from '../../testing/test-scaffold';

describe('WakeLockService', () => {
  let service: WakeLockService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: TestingModuleProviders
    });
    service = TestBed.inject(WakeLockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
