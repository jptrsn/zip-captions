import { TestBed } from '@angular/core/testing';

import { LocalDbService } from './local-db.service';

describe('LocalDbService', () => {
  let service: LocalDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
