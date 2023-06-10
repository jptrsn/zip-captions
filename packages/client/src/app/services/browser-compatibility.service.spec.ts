import { TestBed } from '@angular/core/testing';

import { BrowserCompatibilityService } from './browser-compatibility.service';

describe('BrowserCompatibilityService', () => {
  let service: BrowserCompatibilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrowserCompatibilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
