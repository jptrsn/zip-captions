import { TestBed } from '@angular/core/testing';
import { TestingModuleProviders } from '../../../../testing/test-scaffold';
import { PeerService } from './peer.service';

describe('PeerService', () => {
  let service: PeerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: TestingModuleProviders
    });
    service = TestBed.inject(PeerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
