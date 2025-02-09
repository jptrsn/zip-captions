import { TestBed } from '@angular/core/testing';

import { SupporterService } from './supporter.service';

describe('SupporterService', () => {
  let service: SupporterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupporterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
