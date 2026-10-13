import { computed, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { CaptionSegment } from '../../../models/caption-segment.model';
import { defaultAppState } from '../../../reducers/app.reducer';
import { selectRecognitionEngine } from '../../../selectors/recognition.selector';
import { AzureRecognitionService } from './azure-recognition.service';
import { RecognitionService } from './recognition.service';
import { WebRecognitionService } from './web-recognition.service';

const stubEngine = (segments: CaptionSegment[]) => {
  const recognizedSegments = signal(segments);
  const recognizedText = computed(() => recognizedSegments().map((segment) => segment.text));
  return {
    recognizedSegments,
    setLanguage: jest.fn(),
    getLiveOutput: () => signal(''),
    getRecognizedSegments: () => recognizedSegments,
    getRecognizedText: () => recognizedText,
  };
};

describe('RecognitionService', () => {
  let service: RecognitionService;
  let store: MockStore;
  let web: ReturnType<typeof stubEngine>;
  let azure: ReturnType<typeof stubEngine>;

  beforeEach(() => {
    web = stubEngine([{ id: 'w-e-0', text: 'web one', lang: 'en-US' }, { id: 'w-e-1', text: 'web two', lang: 'en-US' }]);
    azure = stubEngine([{ id: 'a-e-0', text: 'azure one', lang: 'fr-CA' }]);
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({ initialState: defaultAppState }),
        { provide: WebRecognitionService, useValue: web },
        { provide: AzureRecognitionService, useValue: azure },
      ]
    });
    store = TestBed.inject(MockStore);
  });

  const useProvider = (provider: 'web' | 'azure') => {
    store.overrideSelector(selectRecognitionEngine, { ...defaultAppState.recognition.engine, provider });
    service = TestBed.inject(RecognitionService);
  };

  it('should be created', () => {
    useProvider('web');
    expect(service).toBeTruthy();
  });

  it.each(['web', 'azure'] as const)('returns the %s engine segments', (provider) => {
    useProvider(provider);
    const engine = provider === 'web' ? web : azure;
    expect(service.getRecognizedSegments()()).toEqual(engine.recognizedSegments());
  });

  it.each(['web', 'azure'] as const)('keeps getRecognizedText() equal to the %s segment texts, in order', (provider) => {
    useProvider(provider);
    const engine = provider === 'web' ? web : azure;
    const text = service.getRecognizedText();
    expect(text()).toEqual(engine.recognizedSegments().map((segment) => segment.text));
    expect(service.getRecognizedText()).toBe(text);

    engine.recognizedSegments.update((current) => [...current, { id: 'x', text: 'next', lang: 'en-US' }]);
    expect(text()[text().length - 1]).toBe('next');
  });
});
