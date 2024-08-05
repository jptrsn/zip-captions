import { TestBed } from '@angular/core/testing';

import { WebgpuWhisperService } from './webgpu-whisper.service';

describe('WebgpuWhisperService', () => {
  let service: WebgpuWhisperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebgpuWhisperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
