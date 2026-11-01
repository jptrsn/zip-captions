import { TestBed } from '@angular/core/testing';
import { MockStore } from '@ngrx/store/testing';
import { TestingModuleProviders } from '../../../../testing/test-scaffold';
import { AppPlatform, AppState } from '../../../models/app.model';
import { defaultAppState } from '../../../reducers/app.reducer';
import { WebRecognitionService } from './web-recognition.service';

describe('WebRecognitionService', () => {
  let service: WebRecognitionService;
  let store: MockStore<AppState>;
  let listeners: Record<string, (e: any) => void>;

  beforeEach(() => {
    listeners = {};
    (global as any).SpeechRecognition = jest.fn().mockImplementation(() => ({
      interimResults: false,
      continuous: false,
      lang: '',
      start: jest.fn(),
      stop: jest.fn(),
      addEventListener: jest.fn((event: string, cb: (e: any) => void) => {
        listeners[event] = cb;
      }),
    }));
    (global as any).webkitSpeechRecognition = (global as any).SpeechRecognition;

    TestBed.configureTestingModule({
      providers: TestingModuleProviders,
    });
    store = TestBed.inject<MockStore<AppState>>(MockStore);
    service = TestBed.inject(WebRecognitionService);
  });

  afterEach(() => {
    delete (global as any).SpeechRecognition;
    delete (global as any).webkitSpeechRecognition;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should reset transcript on clear() so a subsequent empty result on mobile does not restore cleared text', () => {
    store.setState({
      ...defaultAppState,
      appearance: {
        ...defaultAppState.appearance,
        platform: AppPlatform.mobile,
      },
    });

    const nonEmptyResult = Object.assign([{ transcript: 'hello world', confidence: 0.9 }], { isFinal: false });
    listeners['result']({
      results: {
        length: 1,
        item: () => nonEmptyResult,
      },
    });
    expect(service.getLiveOutput()()).toBe('hello world');

    service.clear();
    expect(service.getLiveOutput()()).toBe('');

    const emptyResult = Object.assign([{ transcript: '', confidence: 0 }], { isFinal: false });
    listeners['result']({
      results: {
        length: 1,
        item: () => emptyResult,
      },
    });
    expect(service.getLiveOutput()()).toBe('');
  });
});
