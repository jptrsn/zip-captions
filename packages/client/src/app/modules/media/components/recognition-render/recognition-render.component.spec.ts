import { NO_ERRORS_SCHEMA, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';
import { CaptionSegment } from '../../../../models/caption-segment.model';
import { RecognitionStatus } from '../../../../models/recognition.model';
import { defaultAppState } from '../../../../reducers/app.reducer';
import { DocumentPipService } from '../../../../services/document-pip/document-pip.service';
import { FullScreenService } from '../../../../services/full-screen/full-screen.service';
import { CaptionTranslationService } from '../../../../services/translator/caption-translation.service';
import { ChromeTranslatorService, TranslationModelStatus } from '../../../../services/translator/chrome-translator.service';
import { SegmentTranslation } from '../../../../services/translator/segment-translations';
import { SettingsActions, TranslationSettings } from '../../../settings/models/settings.model';
import { RecognitionService } from '../../services/recognition.service';
import { RecognitionRenderComponent } from './recognition-render.component';

interface Scenario {
  status?: RecognitionStatus;
  id?: string;
  translation?: Partial<TranslationSettings>;
  lang?: 'en' | 'ar' | 'fr';
  dialect?: string;
  textFlow?: 'top-down' | 'bottom-up';
  translatorSupported?: boolean;
  fullscreenAvailable?: boolean;
  pipSupported?: boolean;
}

const segment = (id: string, text: string, lang = 'en'): CaptionSegment => ({ id, text, lang });

describe('RecognitionRenderComponent', () => {
  let component: RecognitionRenderComponent;
  let fixture: ComponentFixture<RecognitionRenderComponent>;
  let store: MockStore;
  let dispatch: jest.SpyInstance;
  let live: ReturnType<typeof signal<string>>;
  let finals: ReturnType<typeof signal<string[]>>;
  let segments: ReturnType<typeof signal<CaptionSegment[]>>;
  let translations: ReturnType<typeof signal<Map<string, SegmentTranslation>>>;
  let modelStatus: ReturnType<typeof signal<TranslationModelStatus>>;
  let fullScreen: { isAvailable: boolean; isFullscreen: ReturnType<typeof signal<boolean>>; registerElement: jest.Mock; deregisterElement: jest.Mock };
  let pip: { isSupported: boolean; isPipActive: ReturnType<typeof signal<boolean>>; registerElement: jest.Mock; deregisterElement: jest.Mock; close: jest.Mock };
  let translator: { isSupported: () => boolean; modelStatus: unknown; downloadProgress: unknown; checkModelStatus: jest.Mock; downloadModel: jest.Mock; normalizeLanguageCode: (c?: string) => string };
  let translatorSupported: boolean;

  const create = (s: Scenario = {}) => {
    translatorSupported = s.translatorSupported ?? true;
    fullScreen.isAvailable = s.fullscreenAvailable ?? false;
    pip.isSupported = s.pipSupported ?? false;
    const base = defaultAppState;
    store.setState({
      ...base,
      recognition: { ...base.recognition, status: s.status ?? RecognitionStatus.connected, id: s.id ?? 'default' },
      settings: {
        ...base.settings,
        lang: s.lang ?? 'en',
        dialect: (s.dialect ?? 'unspecified') as never,
        textFlow: s.textFlow ?? 'bottom-up',
        translation: { enabled: true, mode: 'split', targetLanguage: 'fr', ...s.translation },
      },
    });
    fixture = TestBed.createComponent(RecognitionRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };
  const byId = (id: string) => fixture.nativeElement.querySelector(`[data-testid="${id}"]`) as HTMLElement | null;

  beforeEach(async () => {
    live = signal('');
    finals = signal<string[]>([]);
    segments = signal<CaptionSegment[]>([]);
    translations = signal(new Map<string, SegmentTranslation>());
    modelStatus = signal<TranslationModelStatus>('ready');
    fullScreen = { isAvailable: false, isFullscreen: signal(false), registerElement: jest.fn(), deregisterElement: jest.fn() };
    pip = { isSupported: false, isPipActive: signal(false), registerElement: jest.fn(), deregisterElement: jest.fn(), close: jest.fn() };
    translator = {
      isSupported: () => translatorSupported,
      modelStatus,
      downloadProgress: signal(40),
      checkModelStatus: jest.fn(),
      downloadModel: jest.fn(),
      normalizeLanguageCode: (c?: string) => (c ?? '').split('-')[0].toLowerCase(),
    };
    await TestBed.configureTestingModule({
      imports: [...TestingModuleImports],
      providers: [
        ...TestingModuleProviders,
        { provide: FullScreenService, useValue: fullScreen },
        { provide: DocumentPipService, useValue: pip },
        { provide: RecognitionService, useValue: { getLiveOutput: () => live, getRecognizedText: () => finals } },
        { provide: ChromeTranslatorService, useValue: translator },
        { provide: CaptionTranslationService, useValue: { segments, translatedLive: signal(''), translations } },
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [RecognitionRenderComponent],
    }).compileComponents();
    store = TestBed.inject(Store) as MockStore;
    dispatch = jest.spyOn(store, 'dispatch');
  });

  afterEach(() => jest.useRealTimers());

  describe('results', () => {
    it('has no live results while connected with nothing said yet', () => {
      create({ status: RecognitionStatus.connected });
      expect(component.hasLiveResults()).toBe(false);
    });

    it('has live results once something is being said or has been said', () => {
      live.set('hello');
      create();
      expect(component.hasLiveResults()).toBe(true);
      expect(component.liveText()).toBe('hello');
      fixture.destroy();
      live.set('');
      finals.set(['hello there']);
      create();
      expect(component.hasLiveResults()).toBe(true);
      expect(component.textOutput()).toEqual(['hello there']);
    });

    it('keeps the results visible after recognition has stopped, but not before it ever started', () => {
      create({ status: RecognitionStatus.disconnected });
      expect(component.hasLiveResults()).toBe(true);
      fixture.destroy();
      create({ status: RecognitionStatus.uninitialized, id: '' });
      expect(component.hasLiveResults()).toBe(false);
    });

    it('shows no text without a recognition session', () => {
      live.set('hello');
      finals.set(['hello there']);
      create({ id: '' });
      expect(component.liveText()).toBe('');
      expect(component.textOutput()).toEqual([]);
    });

    it('flows top-down or bottom-up as set', () => {
      create({ textFlow: 'top-down' });
      expect(component.textFlowDown()).toBe(true);
      fixture.destroy();
      create({ textFlow: 'bottom-up' });
      expect(component.textFlowDown()).toBe(false);
    });
  });

  describe('translation view', () => {
    it('follows the stored mode when the browser can translate', () => {
      create({ translation: { mode: 'translated-only' } });
      expect(component.translationMode()).toBe('translated-only');
      expect(component.captionView()).toBe('translated');
    });

    it('shows only the original, whatever the stored mode, when the browser cannot translate', () => {
      create({ translatorSupported: false, translation: { mode: 'split' } });
      expect(component.translationMode()).toBe('off');
      expect(component.captionView()).toBe('original');
    });

    it('shows the original when translation is off', () => {
      create({ translation: { mode: 'off', enabled: false } });
      expect(component.captionView()).toBe('original');
    });

    it('defaults to stacked panes, original first, for settings saved before the layout existed', () => {
      create();
      expect(component.splitOrientation()).toBe('vertical');
      expect(component.paneOrder()).toBe('original-first');
      expect(component.panes()).toEqual(['original', 'translated']);
    });

    it('puts the translated pane first when asked', () => {
      create({ translation: { paneOrder: 'translated-first' } });
      expect(component.panes()).toEqual(['translated', 'original']);
    });

    it('builds one line per segment in each pane, with a placeholder where the translation is pending', () => {
      segments.set([segment('a', 'Hello'), segment('b', 'World')]);
      translations.set(new Map([['a', { lang: 'fr', text: 'Bonjour' }]]));
      create();
      expect(component.originalLines().map((l) => l.text)).toEqual(['Hello', 'World']);
      expect(component.translatedLines().map((l) => [l.text, !!l.pending])).toEqual([['Bonjour', false], ['', true]]);
      expect(component.hasTranslatedResults()).toBe(true);
    });

    it('labels the panes with the language codes, using the dialect as the source when one is chosen', () => {
      create({ lang: 'en', dialect: 'fr-CA', translation: { targetLanguage: 'es' } });
      expect(component.sourceLanguage()).toBe('fr-CA');
      expect(component.originalLanguageLabel()).toBe('FR');
      expect(component.targetLanguageLabel()).toBe('ES');
    });

    it('reads Arabic right to left, and not the English pane', () => {
      create({ lang: 'en', translation: { targetLanguage: 'ar' } });
      expect(component.translatedTextDir()).toBe('rtl');
      expect(component.originalTextDir()).toBe('ltr');
    });

    it('does not offer the spoken language as a target, and allows swapping only to a speakable one', () => {
      create({ lang: 'en', translation: { targetLanguage: 'fr' } });
      expect(component.availableLanguages().map((l) => l.code)).not.toContain('en');
      expect(component.canSwap()).toBe(true);
      fixture.destroy();
      create({ lang: 'en', translation: { targetLanguage: 'ja' } });
      expect(component.canSwap()).toBe(false);
    });
  });

  describe('translation controls', () => {
    it('chooses a target language without changing the mode while translating', () => {
      create({ translation: { mode: 'split' } });
      component.setTargetLanguage('de');
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith(SettingsActions.setTranslationTargetLanguage({ targetLanguage: 'de' }));
    });

    it('turns translation on in split view when a language is chosen while it is off', () => {
      create({ translation: { mode: 'off', enabled: false } });
      component.setTargetLanguage('de');
      expect(dispatch).toHaveBeenCalledWith(SettingsActions.setTranslationMode({ mode: 'split' }));
      expect(dispatch).toHaveBeenCalledWith(SettingsActions.setTranslationEnabled({ enabled: true }));
    });

    it('swaps the languages, the panes and the orientation', () => {
      create({ translation: { splitOrientation: 'horizontal' } });
      component.swapLanguages();
      component.swapPanes();
      component.toggleOrientation();
      expect(dispatch).toHaveBeenCalledWith(SettingsActions.swapTranslationLanguages());
      expect(dispatch).toHaveBeenCalledWith(SettingsActions.swapCaptionPanes());
      expect(dispatch).toHaveBeenCalledWith(SettingsActions.setSplitOrientation({ orientation: 'vertical' }));
    });

    it('offers to download the model when it can be, and reports progress while it downloads', () => {
      modelStatus.set('downloadable');
      create();
      expect(byId('zc-caption-download-model')).toBeTruthy();
      expect(byId('zc-caption-download-progress')).toBeNull();
      byId('zc-caption-download-model')!.click();
      expect(translator.downloadModel).toHaveBeenCalledWith('en', 'fr');
      modelStatus.set('downloading');
      fixture.detectChanges();
      expect(byId('zc-caption-download-model')).toBeNull();
      expect(byId('zc-caption-download-progress')?.textContent).toContain('40%');
    });
  });

  describe('model status', () => {
    it('checks the model for the language pair when it starts', () => {
      create();
      expect(translator.checkModelStatus).toHaveBeenCalledWith('en', 'fr');
    });

    it('does not check the model when the browser cannot translate', () => {
      create({ translatorSupported: false });
      expect(translator.checkModelStatus).not.toHaveBeenCalled();
    });
  });

  describe('Picture-in-Picture', () => {
    it('shows the feed switch inside the PiP window while translating, and sets the feed', () => {
      pip.isPipActive.set(true);
      create({ translation: { mode: 'split', pipContent: 'translated' } });
      expect(byId('zc-pip-feed-switch')).toBeTruthy();
      expect(component.captionView()).toBe('translated');
      byId('zc-pip-feed-split')!.click();
      expect(dispatch).toHaveBeenCalledWith(SettingsActions.setPipContent({ content: 'split' }));
    });

    it('shows no feed switch when translation is off or PiP is closed', () => {
      create({ translation: { mode: 'split' } });
      expect(byId('zc-pip-feed-switch')).toBeNull();
      fixture.destroy();
      pip.isPipActive.set(true);
      create({ translation: { mode: 'off', enabled: false } });
      expect(byId('zc-pip-feed-switch')).toBeNull();
    });

    it('lets the user bring the captions back from the PiP window', () => {
      pip.isPipActive.set(true);
      create();
      byId('zc-pip-return')!.click();
      expect(pip.close).toHaveBeenCalled();
    });

    it('registers the caption container with PiP when supported, and releases it on destroy', () => {
      create({ pipSupported: true });
      expect(pip.registerElement).toHaveBeenCalled();
      fixture.destroy();
      expect(pip.deregisterElement).toHaveBeenCalled();
    });

    it('does not touch PiP when it is not supported', () => {
      create({ pipSupported: false });
      fixture.destroy();
      expect(pip.registerElement).not.toHaveBeenCalled();
      expect(pip.deregisterElement).not.toHaveBeenCalled();
    });

    it('closes the controls drawer when PiP starts', () => {
      create({ pipSupported: true });
      component.sidebarCheckbox.nativeElement.checked = true;
      pip.isPipActive.set(true);
      fixture.detectChanges();
      expect(component.sidebarCheckbox.nativeElement.checked).toBe(false);
    });
  });

  describe('full screen', () => {
    it('registers with the full screen service when it is available, and releases on destroy', () => {
      create({ fullscreenAvailable: true });
      expect(fullScreen.registerElement).toHaveBeenCalled();
      fixture.destroy();
      expect(fullScreen.deregisterElement).toHaveBeenCalled();
    });

    it('does not register when full screen is not available', () => {
      create({ fullscreenAvailable: false });
      expect(fullScreen.registerElement).not.toHaveBeenCalled();
    });

    it('closes the controls drawer on entering full screen', () => {
      create({ fullscreenAvailable: true });
      component.sidebarCheckbox.nativeElement.checked = true;
      fullScreen.isFullscreen.set(true);
      fixture.detectChanges();
      expect(component.sidebarCheckbox.nativeElement.checked).toBe(false);
    });
  });

  describe('controls fade', () => {
    beforeEach(() => jest.useFakeTimers());

    it('hides the controls after 1 second without activity, and brings them back on activity', () => {
      create();
      expect(component.controlsVisible()).toBe(true);
      jest.advanceTimersByTime(999);
      expect(component.controlsVisible()).toBe(true);
      jest.advanceTimersByTime(1);
      expect(component.controlsVisible()).toBe(false);
      component.onUserActivity();
      expect(component.controlsVisible()).toBe(true);
      jest.advanceTimersByTime(1000);
      expect(component.controlsVisible()).toBe(false);
    });

    it('restarts the countdown on each activity', () => {
      create();
      jest.advanceTimersByTime(800);
      component.onUserActivity();
      jest.advanceTimersByTime(800);
      expect(component.controlsVisible()).toBe(true);
    });

    it('keeps the controls while one has focus, until activity starts the countdown again', () => {
      create();
      component.onControlsFocus();
      jest.advanceTimersByTime(10000);
      expect(component.controlsVisible()).toBe(true);
      component.onUserActivity();
      jest.advanceTimersByTime(1000);
      expect(component.controlsVisible()).toBe(false);
    });

    it('does not fade after the component is destroyed', () => {
      create();
      fixture.destroy();
      expect(jest.getTimerCount()).toBe(0);
    });
  });
});
