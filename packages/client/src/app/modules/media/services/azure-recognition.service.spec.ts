import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { RecognitionActions } from '../../../actions/recogntion.actions';
import { defaultAppState } from '../../../reducers/app.reducer';
import { selectProfanityFilterEnabled } from '../../../selectors/recognition.selector';
import { selectTranscriptionEnabled } from '../../../selectors/settings.selector';
import { AzureRecognitionService } from './azure-recognition.service';

const mockSpeechConfigs: any[] = [];
const mockRecognizers: any[] = [];
const mockRecognizerArgs: any[][] = [];

jest.mock('microsoft-cognitiveservices-speech-sdk', () => ({
  ResultReason: { NoMatch: 0, RecognizedSpeech: 3 },
  ProfanityOption: { Masked: 0, Removed: 1, Raw: 2 },
  SpeechConfig: {
    fromAuthorizationToken: jest.fn(() => {
      const config = { speechRecognitionLanguage: '', setProfanity: jest.fn() };
      mockSpeechConfigs.push(config);
      return config;
    })
  },
  AudioConfig: { fromDefaultMicrophoneInput: jest.fn(() => ({})) },
  SpeechRecognizer: jest.fn().mockImplementation((...args: any[]) => {
    mockRecognizerArgs.push(args);
    const recognizer = {
      speechRecognitionLanguage: args[0].speechRecognitionLanguage,
      close: jest.fn(),
      startContinuousRecognitionAsync: jest.fn(),
      stopContinuousRecognitionAsync: jest.fn()
    };
    mockRecognizers.push(recognizer);
    return recognizer;
  })
}));

const RECOGNIZED_SPEECH = 3;
const NO_MATCH = 0;

describe('AzureRecognitionService', () => {
  let service: AzureRecognitionService;
  let http: HttpTestingController;
  let store: MockStore;

  const setup = (transcriptionEnabled = false) => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [provideMockStore({ initialState: defaultAppState })]
    });
    store = TestBed.inject(MockStore);
    store.overrideSelector(selectTranscriptionEnabled, transcriptionEnabled);
    store.overrideSelector(selectProfanityFilterEnabled, true);
    jest.spyOn(store, 'dispatch');
    http = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AzureRecognitionService);
  };

  const initialize = (language: string) => {
    service.initialize(language as any).subscribe();
    http.expectOne((req) => req.url.endsWith('/get-token')).flush({ token: 'token', region: 'region' });
    return mockRecognizers[mockRecognizers.length - 1];
  };

  const recognize = (recognizer: any, text: string, reason = RECOGNIZED_SPEECH, language?: string) => {
    recognizer.recognizing({}, { result: { text } });
    recognizer.recognized({}, { sessionId: 'session', result: { text, reason, language } });
  };

  const connect = (language: string) => {
    service.connectToStream(language as any);
    http.expectOne((req) => req.url.endsWith('/get-token')).flush({ token: 'token', region: 'region' });
    return mockRecognizers[mockRecognizers.length - 1];
  };

  beforeEach(() => {
    mockSpeechConfigs.length = 0;
    mockRecognizers.length = 0;
    mockRecognizerArgs.length = 0;
  });

  it('appends a segment per recognized result, tagged with the configured locale', () => {
    setup();
    const recognizer = initialize('fr-CA');
    recognize(recognizer, 'Bonjour tout le monde.');
    recognize(recognizer, 'Hello everyone.');

    const segments = service.getRecognizedSegments()();
    expect(segments.map((segment) => [segment.text, segment.lang])).toEqual([
      ['Bonjour tout le monde.', 'fr-CA'],
      ['Hello everyone.', 'fr-CA'],
    ]);
    expect(segments.every((segment) => segment.id.startsWith('a-'))).toBe(true);
    expect(service.getLiveOutput()()).toBe('');
  });

  it('keeps segment IDs stable across history rollover', () => {
    setup();
    const recognizer = initialize('en-US');
    for (let i = 0; i < 15; i++) recognize(recognizer, `line ${i}`);
    const idsBefore = new Map(service.getRecognizedSegments()().map((segment) => [segment.text, segment.id]));

    for (let i = 15; i < 20; i++) recognize(recognizer, `line ${i}`);
    const segments = service.getRecognizedSegments()();
    expect(segments.length).toBe(15);
    expect(segments[0].text).toBe('line 5');
    segments.filter((segment) => idsBefore.has(segment.text))
      .forEach((segment) => expect(segment.id).toBe(idsBefore.get(segment.text)));
  });

  it('derives getRecognizedText() from the segments', () => {
    setup();
    const recognizer = initialize('en-US');
    ['one', 'two'].forEach((text) => recognize(recognizer, text));
    expect(service.getRecognizedText()()).toEqual(['one', 'two']);
    expect(service.getRecognizedText()).toBe(service.getRecognizedText());
  });

  it('ignores NoMatch and empty results: no segment and no transcript entry', () => {
    setup(true);
    const recognizer = initialize('en-US');
    recognize(recognizer, '', NO_MATCH);
    recognize(recognizer, '   ');
    recognize(recognizer, 'real speech');

    expect(service.getRecognizedText()()).toEqual(['real speech']);
    const transcriptDispatches = (store.dispatch as jest.Mock).mock.calls
      .filter(([action]) => action.type === RecognitionActions.addTranscriptSegment.type);
    expect(transcriptDispatches.length).toBe(1);
    expect(transcriptDispatches[0][0].text).toBe('real speech');
  });

  it('records the same start time on the segment and the transcript segment', () => {
    setup(true);
    const recognizer = initialize('en-US');
    recognize(recognizer, 'hello');
    const segment = service.getRecognizedSegments()()[0];
    expect(segment.start).toBeInstanceOf(Date);
    expect(store.dispatch).toHaveBeenCalledWith(RecognitionActions.addTranscriptSegment({ text: 'hello', start: segment.start }));
  });

  it('leaves bilingual locale configuration unchanged (FR-AZ-2)', () => {
    setup();
    initialize('fr-CA');
    expect(mockSpeechConfigs[0].speechRecognitionLanguage).toBe('fr-CA');
    // Recognizer is built from speech + audio config only: no auto-detect / LID config
    expect(mockRecognizerArgs[0].length).toBe(2);
  });

  it.each(['fr-CA', 'es-US', 'ar-AE', 'ar-SA', 'ar-YE', 'en-IN'])('leaves %s configured by locale only', (locale) => {
    setup();
    initialize(locale);
    expect(mockSpeechConfigs[0].speechRecognitionLanguage).toBe(locale);
    expect(Object.keys(mockSpeechConfigs[0]).sort()).toEqual(['setProfanity', 'speechRecognitionLanguage']);
    expect(mockRecognizerArgs[0].length).toBe(2);
  });

  it('uses the language Azure reports for a result, when it provides one', () => {
    setup();
    const recognizer = initialize('fr-CA');
    recognize(recognizer, 'Hello everyone.', RECOGNIZED_SPEECH, 'en-US');
    recognize(recognizer, 'Bonjour tout le monde.', RECOGNIZED_SPEECH, '');
    expect(service.getRecognizedSegments()().map((segment) => segment.lang)).toEqual(['en-US', 'fr-CA']);
  });

  describe('changing language mid-session', () => {
    it('restarts continuous recognition on the rebuilt recognizer', () => {
      setup();
      const first = connect('fr-CA');
      expect(first.startContinuousRecognitionAsync).toHaveBeenCalledTimes(1);

      service.setLanguage('en-US');
      expect(first.stopContinuousRecognitionAsync).toHaveBeenCalled();
      expect(first.close).toHaveBeenCalled();

      http.expectOne((req) => req.url.endsWith('/get-token')).flush({ token: 'token', region: 'region' });
      const second = mockRecognizers[mockRecognizers.length - 1];
      expect(second).not.toBe(first);
      expect(second.startContinuousRecognitionAsync).toHaveBeenCalledTimes(1);
      expect(mockSpeechConfigs[1].speechRecognitionLanguage).toBe('en-US');

      recognize(second, 'hello there');
      expect(service.getRecognizedSegments()()[0].lang).toBe('en-US');
    });

    it('rebuilds without starting when not streaming', () => {
      setup();
      const first = initialize('fr-CA');
      service.setLanguage('en-US');
      http.expectOne((req) => req.url.endsWith('/get-token')).flush({ token: 'token', region: 'region' });
      expect(first.close).toHaveBeenCalled();
      expect(first.stopContinuousRecognitionAsync).not.toHaveBeenCalled();
      expect(mockRecognizers[mockRecognizers.length - 1].startContinuousRecognitionAsync).not.toHaveBeenCalled();
    });

    it('does nothing when the language is unchanged', () => {
      setup();
      const first = connect('fr-CA');
      service.setLanguage('fr-CA');
      http.expectNone((req) => req.url.endsWith('/get-token'));
      expect(first.close).not.toHaveBeenCalled();
    });
  });
});
