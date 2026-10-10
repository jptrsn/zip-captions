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
    const recognizer = { close: jest.fn(), startContinuousRecognitionAsync: jest.fn(), stopContinuousRecognitionAsync: jest.fn() };
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

  const recognize = (recognizer: any, text: string, reason = RECOGNIZED_SPEECH) => {
    recognizer.recognizing({}, { result: { text } });
    recognizer.recognized({}, { sessionId: 'session', result: { text, reason } });
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
});
