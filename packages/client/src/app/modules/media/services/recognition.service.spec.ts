import { TestBed } from '@angular/core/testing';

import { TestingModuleProviders } from '../../../../testing/test-scaffold';
import { RecognitionService } from './recognition.service';

describe('RecognitionService', () => {
  let service: RecognitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: TestingModuleProviders
    });
    service = TestBed.inject(RecognitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
