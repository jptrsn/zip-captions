import { TestBed } from '@angular/core/testing';

import { ObsConnectionService } from './obs-connection.service';
import { TestingModuleProviders } from '../../../testing/test-scaffold';

describe('ObsConnectionService', () => {
  let service: ObsConnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: TestingModuleProviders
    });
    service = TestBed.inject(ObsConnectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
