import { TestBed } from '@angular/core/testing';

jest.mock('microsoft-cognitiveservices-speech-sdk', () => ({}));

import { TestingModuleProviders } from '../../../../testing/test-scaffold';
import { PeerService } from '../../peer/services/peer.service';
import { AzureRecognitionService } from './azure-recognition.service';
import { RecognitionService } from './recognition.service';
import { WebRecognitionService } from './web-recognition.service';

describe('RecognitionService', () => {
  let service: RecognitionService;
  let peerService: PeerService;
  let webRecognitionMock: { clear: jest.Mock; setLanguage: jest.Mock };
  let azureRecognitionMock: { clear: jest.Mock; setLanguage: jest.Mock };

  beforeEach(() => {
    webRecognitionMock = { clear: jest.fn(), setLanguage: jest.fn() };
    azureRecognitionMock = { clear: jest.fn(), setLanguage: jest.fn() };

    TestBed.configureTestingModule({
      providers: [
        ...TestingModuleProviders,
        { provide: WebRecognitionService, useValue: webRecognitionMock },
        { provide: AzureRecognitionService, useValue: azureRecognitionMock },
      ]
    });
    service = TestBed.inject(RecognitionService);
    peerService = TestBed.inject(PeerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should clear PeerService liveText$ and textOutput$ on clearRecognition()', () => {
    peerService.liveText$.next('in progress');
    peerService.textOutput$.next(['segment 1']);

    service.clearRecognition();

    expect(webRecognitionMock.clear).toHaveBeenCalled();
    expect(peerService.liveText$.value).toBe('');
    expect(peerService.textOutput$.value).toEqual([]);
  });
});
