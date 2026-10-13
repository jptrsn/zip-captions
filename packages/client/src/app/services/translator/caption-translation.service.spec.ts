import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Subject } from 'rxjs';
import { CaptionSegment } from '../../models/caption-segment.model';
import { RecognitionService } from '../../modules/media/services/recognition.service';
import { TranslationSettings } from '../../modules/settings/models/settings.model';
import { defaultAppState } from '../../reducers/app.reducer';
import { recognitionIdSelector } from '../../selectors/recognition.selector';
import { dialectSelector, languageSelector, selectTranslationSettings } from '../../selectors/settings.selector';
import { CaptionTranslationService } from './caption-translation.service';
import { ChromeTranslatorService } from './chrome-translator.service';

const seg = (id: string, text: string, lang = 'en-US'): CaptionSegment => ({ id, text, lang });
@Component({ template: '' })
class HostComponent {}

// Effects (which feed toObservable) run during change detection; translation promises on microtasks
let host: ComponentFixture<HostComponent>;
const flush = async () => {
  host.detectChanges();
  await new Promise((resolve) => setTimeout(resolve, 0));
  host.detectChanges();
  await new Promise((resolve) => setTimeout(resolve, 0));
};

describe('CaptionTranslationService', () => {
  let segments: ReturnType<typeof signal<CaptionSegment[]>>;
  let live: ReturnType<typeof signal<string>>;
  let translator: {
    isSupported: jest.Mock;
    translateSegmentsStrict: jest.Mock;
    createLiveChannel: jest.Mock;
    modelReady$: Subject<unknown>;
  };
  let liveChannel: { queue: jest.Mock; output$: Subject<string> };
  let store: MockStore;

  const setup = (translation: Partial<TranslationSettings>, supported = true) => {
    liveChannel = { queue: jest.fn(), output$: new Subject<string>() };
    segments = signal<CaptionSegment[]>([]);
    live = signal('');
    translator = {
      isSupported: jest.fn(() => supported),
      translateSegmentsStrict: jest.fn((texts: string[], _s: string, t: string) => Promise.resolve(texts.map((text) => `${t}:${text}`))),
      createLiveChannel: jest.fn(() => liveChannel),
      modelReady$: new Subject(),
    };
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({ initialState: defaultAppState }),
        { provide: ChromeTranslatorService, useValue: translator },
        { provide: RecognitionService, useValue: { getRecognizedSegments: () => segments, getLiveOutput: () => live } },
      ],
    });
    store = TestBed.inject(MockStore);
    store.overrideSelector(recognitionIdSelector, 'caption');
    store.overrideSelector(selectTranslationSettings, { enabled: true, mode: 'split', targetLanguage: 'fr', ...translation } as TranslationSettings);
    store.overrideSelector(dialectSelector, 'en-US');
    store.overrideSelector(languageSelector, 'en');
    store.refreshState();
    host = TestBed.createComponent(HostComponent);
    return TestBed.inject(CaptionTranslationService);
  };

  it('translates recognized segments into the target language, keyed by segment ID', async () => {
    const service = setup({});
    segments.set([seg('a', 'one'), seg('b', 'two')]);
    await flush();
    expect(service.active()).toBe(true);
    expect(translator.translateSegmentsStrict).toHaveBeenCalledWith(['one', 'two'], 'en', 'fr');
    expect(service.translations().get('a')?.text).toBe('fr:one');
    expect(service.translations().get('b')?.text).toBe('fr:two');
  });

  it('does not translate when the display mode is off', async () => {
    const service = setup({ mode: 'off', enabled: false });
    segments.set([seg('a', 'one')]);
    await flush();
    expect(service.active()).toBe(false);
    expect(translator.translateSegmentsStrict).not.toHaveBeenCalled();
    expect(service.translations().size).toBe(0);
  });

  it('does not translate on a device that cannot', async () => {
    const service = setup({}, false);
    segments.set([seg('a', 'one')]);
    await flush();
    expect(service.active()).toBe(false);
    expect(translator.translateSegmentsStrict).not.toHaveBeenCalled();
  });

  it('leaves a segment without a translation when it could not be translated', async () => {
    const service = setup({});
    translator.translateSegmentsStrict.mockImplementation((texts: string[]) => Promise.resolve(texts.map((t) => t === 'bad' ? null : `fr:${t}`)));
    segments.set([seg('a', 'good'), seg('b', 'bad')]);
    await flush();
    expect(service.translations().has('a')).toBe(true);
    expect(service.translations().has('b')).toBe(false);
  });

  it('translates segments in the target language without calling the translator', async () => {
    const service = setup({ targetLanguage: 'fr' });
    segments.set([seg('a', 'bonjour', 'fr-CA')]);
    await flush();
    expect(translator.translateSegmentsStrict).not.toHaveBeenCalled();
    expect(service.translations().get('a')?.text).toBe('bonjour');
  });

  it('forgets translations when the segments are cleared', async () => {
    const service = setup({});
    segments.set([seg('a', 'one')]);
    await flush();
    segments.set([]);
    await flush();
    expect(service.translations().size).toBe(0);
  });

  it('queues the live line for translation, and exposes the translated line', async () => {
    const service = setup({});
    live.set('hello there');
    await flush();
    expect(liveChannel.queue).toHaveBeenCalledWith('hello there', 'en-US', 'fr');
    liveChannel.output$.next('bonjour');
    expect(service.translatedLive()).toBe('bonjour');
    live.set('');
    await flush();
    expect(service.translatedLive()).toBe('');
  });

  it('retranslates what was waiting when a model becomes ready', async () => {
    const service = setup({});
    await flush();
    translator.translateSegmentsStrict.mockResolvedValueOnce([null]);
    segments.set([seg('a', 'one')]);
    await flush();
    expect(service.translations().size).toBe(0);

    translator.translateSegmentsStrict.mockImplementation((texts: string[]) => Promise.resolve(texts.map((t) => `fr:${t}`)));
    translator.modelReady$.next({});
    await flush();
    expect(service.translations().get('a')?.text).toBe('fr:one');
  });
});
