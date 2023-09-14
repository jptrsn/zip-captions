import { TestBed } from '@angular/core/testing';

import { ObsConnectionService } from './obs-connection.service';

describe('ObsConnectionService', () => {
  let service: ObsConnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObsConnectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
