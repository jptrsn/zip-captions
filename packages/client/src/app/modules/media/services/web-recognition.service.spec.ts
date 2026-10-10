import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { RecognitionActions } from '../../../actions/recogntion.actions';
import { AppPlatform } from '../../../models/app.model';
import { defaultAppState } from '../../../reducers/app.reducer';
import { ObsConnectionState } from '../../../reducers/obs.reducer';
import { platformSelector } from '../../../selectors/app.selector';
import { selectObsConnected } from '../../../selectors/obs.selectors';
import { selectRenderHistoryLength, selectTranscriptionEnabled } from '../../../selectors/settings.selector';
import { WebRecognitionService } from './web-recognition.service';

class FakeSpeechRecognition extends EventTarget {
  lang = '';
  interimResults = false;
  continuous = false;
  start = jest.fn(() => this.dispatchEvent(new Event('start')));
  stop = jest.fn();
}

const resultEvent = (transcript: string, isFinal = false, confidence = 0.9): Event => {
  const result = Object.assign([{ transcript, confidence }], { isFinal });
  const results = Object.assign([result], { item: (idx: number) => [result][idx] });
  return Object.assign(new Event('result'), { results });
};

describe('WebRecognitionService', () => {
  let service: WebRecognitionService;
  let recog: FakeSpeechRecognition;
  let store: MockStore;

  const setup = (transcriptionEnabled = false) => {
    (globalThis as any).webkitSpeechRecognition = jest.fn(() => {
      recog = new FakeSpeechRecognition();
      return recog;
    });
    TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState: defaultAppState })]
    });
    store = TestBed.inject(MockStore);
    store.overrideSelector(platformSelector, AppPlatform.desktop);
    store.overrideSelector(selectObsConnected, ObsConnectionState.disconnected);
    store.overrideSelector(selectRenderHistoryLength, 15);
    store.overrideSelector(selectTranscriptionEnabled, transcriptionEnabled);
    jest.spyOn(store, 'dispatch');
    service = TestBed.inject(WebRecognitionService);
  };

  // Interim text followed by the browser ending the recognition session (the `end` path)
  const speakUntilEnd = (text: string) => {
    recog.dispatchEvent(resultEvent(text));
    recog.dispatchEvent(new Event('end'));
  };

  afterEach(() => {
    delete (globalThis as any).webkitSpeechRecognition;
    jest.useRealTimers();
  });

  it('appends a segment on the end path, tagged with the language captured at start', () => {
    setup();
    service.setLanguage('fr-CA');
    service.connectToStream();
    speakUntilEnd('bonjour');

    const segments = service.getRecognizedSegments()();
    expect(segments.length).toBe(1);
    expect(segments[0]).toEqual(expect.objectContaining({ text: 'bonjour', lang: 'fr-CA' }));
    expect(segments[0].id).toMatch(/^w-/);
  });

  it('keeps the session language for segments until the next start', () => {
    setup();
    service.setLanguage('en-US');
    service.connectToStream();
    service.setLanguage('es-MX');
    recog.dispatchEvent(resultEvent('still english'));
    // `end` restarts recognition, which picks up the new language
    recog.dispatchEvent(new Event('end'));
    speakUntilEnd('hola');

    expect(service.getRecognizedSegments()().map((segment) => segment.lang)).toEqual(['en-US', 'es-MX']);
  });

  it('keeps segment IDs stable across history rollover', () => {
    setup();
    service.setLanguage('en-US');
    service.connectToStream();
    for (let i = 0; i < 15; i++) speakUntilEnd(`line ${i}`);
    const idsBefore = new Map(service.getRecognizedSegments()().map((segment) => [segment.text, segment.id]));

    for (let i = 15; i < 20; i++) speakUntilEnd(`line ${i}`);
    const segments = service.getRecognizedSegments()();
    expect(segments.length).toBe(15);
    expect(segments[0].text).toBe('line 5');
    segments.filter((segment) => idsBefore.has(segment.text))
      .forEach((segment) => expect(segment.id).toBe(idsBefore.get(segment.text)));
  });

  it('derives getRecognizedText() from the segments', () => {
    setup();
    service.setLanguage('en-US');
    service.connectToStream();
    ['one', 'two', 'three'].forEach(speakUntilEnd);

    expect(service.getRecognizedText()()).toEqual(['one', 'two', 'three']);
    expect(service.getRecognizedText()).toBe(service.getRecognizedText());
  });

  it('records the same start time on the segment and the transcript segment', () => {
    setup(true);
    service.setLanguage('en-US');
    service.connectToStream();
    speakUntilEnd('hello');

    const segment = service.getRecognizedSegments()()[0];
    expect(segment.start).toBeInstanceOf(Date);
    expect(store.dispatch).toHaveBeenCalledWith(RecognitionActions.addTranscriptSegment({ text: 'hello', start: segment.start }));
  });

  it('appends a segment on the debounce path for final results', () => {
    jest.useFakeTimers();
    setup();
    service.setLanguage('en-GB');
    service.connectToStream();
    recog.dispatchEvent(resultEvent('cheerio', true));
    jest.advanceTimersByTime(2000);

    const segments = service.getRecognizedSegments()();
    expect(segments.map((segment) => [segment.text, segment.lang])).toEqual([['cheerio', 'en-GB']]);
    expect(service.getLiveOutput()()).toBe('');
  });
});
