import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { BehaviorSubject } from 'rxjs';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';
import { RecognitionActions } from '../../../../actions/recogntion.actions';
import { ObsConnectionState } from '../../../../reducers/obs.reducer';
import { selectObsConnected } from '../../../../selectors/obs.selectors';
import { selectIsBroadcasting } from '../../../../selectors/peer.selectors';
import { recognitionConnectedSelector } from '../../../../selectors/recognition.selector';
import { dialectSelector, languageSelector, selectLineHeight, selectRenderHistoryLength, selectTextSize, selectTranslationSettings } from '../../../../selectors/settings.selector';
import { DocumentPipService } from '../../../../services/document-pip/document-pip.service';
import { ChromeTranslatorService } from '../../../../services/translator/chrome-translator.service';
import { PeerService } from '../../../peer/services/peer.service';
import { AvailableLineHeights, AvailableTextSizes, SettingsActions, TranslationSettings } from '../../../settings/models/settings.model';
import { RecognitionControlSidebarComponent } from './recognition-control-sidebar.component';

interface Scenario {
  textSize?: string;
  lineHeight?: string;
  history?: number;
  active?: boolean;
  translation?: Partial<TranslationSettings> | undefined;
  translatorSupported?: boolean;
  offered?: string[];
  hostLang?: string;
  lang?: string;
  dialect?: string;
}

describe('RecognitionControlSidebarComponent', () => {
  let component: RecognitionControlSidebarComponent;
  let fixture: ComponentFixture<RecognitionControlSidebarComponent>;
  let store: MockStore;
  let dispatch: jest.SpyInstance;
  let offered$: BehaviorSubject<string[]>;
  let hostLanguage$: BehaviorSubject<string | undefined>;
  let translatorSupported: boolean;

  const settings = (t: Partial<TranslationSettings> = {}): TranslationSettings => ({ enabled: true, mode: 'split', targetLanguage: 'fr', ...t });

  const create = (s: Scenario = {}) => {
    translatorSupported = s.translatorSupported ?? true;
    offered$.next(s.offered ?? []);
    hostLanguage$.next(s.hostLang);
    store.overrideSelector(selectTextSize, (s.textSize ?? 'textSize-3xl') as never);
    store.overrideSelector(selectLineHeight, (s.lineHeight ?? 'lineHeight-normal') as never);
    store.overrideSelector(selectRenderHistoryLength, s.history ?? 5);
    store.overrideSelector(recognitionConnectedSelector, s.active ?? true);
    store.overrideSelector(selectIsBroadcasting, false);
    store.overrideSelector(selectObsConnected, ObsConnectionState.disconnected);
    store.overrideSelector(selectTranslationSettings, ('translation' in s ? s.translation : settings()) as TranslationSettings);
    store.overrideSelector(languageSelector, (s.lang ?? 'en') as never);
    store.overrideSelector(dialectSelector, (s.dialect ?? 'unspecified') as never);
    store.refreshState();
    fixture = TestBed.createComponent(RecognitionControlSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dispatch.mockClear();
  };
  const dispatched = () => dispatch.mock.calls.map(([a]) => a);

  beforeEach(async () => {
    offered$ = new BehaviorSubject<string[]>([]);
    hostLanguage$ = new BehaviorSubject<string | undefined>(undefined);
    await TestBed.configureTestingModule({
      imports: [...TestingModuleImports],
      providers: [
        ...TestingModuleProviders,
        { provide: ChromeTranslatorService, useFactory: () => ({ isSupported: () => translatorSupported, normalizeLanguageCode: (c?: string) => (c ?? '').split('-')[0].toLowerCase() }) },
        { provide: PeerService, useValue: { offeredLanguages$: offered$, hostLanguage$ } },
        { provide: DocumentPipService, useValue: { isSupported: true } },
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [RecognitionControlSidebarComponent],
    }).compileComponents();
    store = TestBed.inject(Store) as MockStore;
    dispatch = jest.spyOn(store, 'dispatch');
  });

  describe('text size', () => {
    it('steps to the next larger size', () => {
      create({ textSize: 'textSize-3xl' });
      component.increaseTextSize();
      expect(dispatched()).toEqual([SettingsActions.setTextSize({ size: 'textSize-4xl' })]);
    });

    it('steps to the next smaller size', () => {
      create({ textSize: 'textSize-3xl' });
      component.decreaseTextSize();
      expect(dispatched()).toEqual([SettingsActions.setTextSize({ size: 'textSize-2xl' })]);
    });

    it('stops at the largest and the smallest size', () => {
      create({ textSize: AvailableTextSizes[AvailableTextSizes.length - 1] });
      expect(component.textSizeMax()).toBe(true);
      component.increaseTextSize();
      expect(dispatched()).toEqual([]);
      fixture.destroy();
      create({ textSize: AvailableTextSizes[0] });
      expect(component.textSizeMin()).toBe(true);
      component.decreaseTextSize();
      expect(dispatched()).toEqual([]);
    });
  });

  describe('line height', () => {
    it('steps up and down', () => {
      create({ lineHeight: 'lineHeight-normal' });
      component.increaseLineHeight();
      component.decreaseLineHeight();
      expect(dispatched()).toEqual([
        SettingsActions.setLineHeight({ height: 'lineHeight-relaxed' }),
        SettingsActions.setLineHeight({ height: 'lineHeight-snug' }),
      ]);
    });

    it('stops at the loosest and the tightest height', () => {
      create({ lineHeight: AvailableLineHeights[AvailableLineHeights.length - 1] });
      expect(component.lineHeightMax()).toBe(true);
      component.increaseLineHeight();
      expect(dispatched()).toEqual([]);
      fixture.destroy();
      create({ lineHeight: AvailableLineHeights[0] });
      expect(component.lineHeightMin()).toBe(true);
      component.decreaseLineHeight();
      expect(dispatched()).toEqual([]);
    });
  });

  describe('lines of history', () => {
    it('adds and removes one line', () => {
      create({ history: 5 });
      component.increaseRenderHistory();
      component.decreaseRenderHistory();
      expect(dispatched()).toEqual([SettingsActions.setRenderHistory({ count: 6 }), SettingsActions.setRenderHistory({ count: 4 })]);
    });

    it('does not go below zero lines', () => {
      create({ history: 0 });
      expect(component.renderHistoryMin()).toBe(true);
      component.decreaseRenderHistory();
      expect(dispatched()).toEqual([]);
    });

    it('stops after 25 lines', () => {
      create({ history: 25 });
      expect(component.renderHistoryMax()).toBe(true);
      component.increaseRenderHistory();
      expect(dispatched()).toEqual([]);
    });
  });

  describe('recognition toggle', () => {
    it('pauses recognition while it is running', () => {
      create({ active: true });
      component.toggleRecognition();
      expect(dispatched()).toEqual([RecognitionActions.pause()]);
    });

    it('resumes recognition when it is not', () => {
      create({ active: false });
      component.toggleRecognition();
      expect(dispatched()).toEqual([RecognitionActions.resume()]);
    });
  });

  describe('translation availability', () => {
    it('is available when this device can translate', () => {
      create({ translatorSupported: true });
      expect(component.translationAvailable()).toBe(true);
      expect(component.translationMode()).toBe('split');
    });

    it('is available to a viewer whose device cannot translate when the broadcaster offers languages', () => {
      create({ translatorSupported: false, offered: ['es'], hostLang: 'en' });
      expect(component.translationAvailable()).toBe(true);
    });

    it('is off, whatever the stored mode, when neither this device nor the broadcaster can translate', () => {
      create({ translatorSupported: false, offered: [] });
      expect(component.translationAvailable()).toBe(false);
      expect(component.translationMode()).toBe('off');
    });

    it('is off when the settings are missing', () => {
      create({ translation: undefined });
      expect(component.translationMode()).toBe('off');
    });
  });

  describe('translation languages', () => {
    it('does not offer the language being spoken as a target', () => {
      create({ lang: 'en' });
      expect(component.availableLanguages().map((l) => l.code)).not.toContain('en');
      expect(component.availableLanguages().map((l) => l.code)).toContain('es');
    });

    it('uses the host language, not the viewer\'s own, as the source for a viewer', () => {
      create({ lang: 'en', hostLang: 'fr-CA' });
      expect(component.availableLanguages().map((l) => l.code)).not.toContain('fr');
      expect(component.availableLanguages().map((l) => l.code)).toContain('en');
    });

    it('prefers a chosen dialect over the language', () => {
      create({ lang: 'en', dialect: 'de-AT' });
      expect(component.availableLanguages().map((l) => l.code)).not.toContain('de');
    });

    it('defaults the target to Spanish, or English when Spanish is spoken, when none is stored', () => {
      create({ translation: undefined, lang: 'en' });
      expect(component.targetLanguage()).toBe('es');
      fixture.destroy();
      create({ translation: undefined, lang: 'es' });
      expect(component.targetLanguage()).toBe('en');
    });

    it('switches the target away from the spoken language when they become the same', () => {
      create({ lang: 'fr', translation: settings({ targetLanguage: 'fr' }) });
      expect(dispatched()).toEqual([]);
      store.overrideSelector(languageSelector, 'es' as never);
      store.overrideSelector(selectTranslationSettings, settings({ targetLanguage: 'es' }));
      store.refreshState();
      fixture.detectChanges();
      expect(dispatched()).toContainEqual(SettingsActions.setTranslationTargetLanguage({ targetLanguage: 'en' }));
    });

    it('lets a speaker swap languages only when the target can also be spoken, and a viewer never', () => {
      create({ translation: settings({ targetLanguage: 'fr' }) });
      expect(component.showSwap()).toBe(true);
      expect(component.canSwap()).toBe(true);
      fixture.destroy();
      create({ translation: settings({ targetLanguage: 'ja' }) });
      expect(component.canSwap()).toBe(false);
      fixture.destroy();
      create({ hostLang: 'en' });
      expect(component.showSwap()).toBe(false);
    });
  });

  describe('translation controls', () => {
    it('setting a mode also switches translation on or off', () => {
      create();
      component.setTranslationMode('translated-only');
      component.setTranslationMode('off');
      expect(dispatched()).toEqual([
        SettingsActions.setTranslationMode({ mode: 'translated-only' }),
        SettingsActions.setTranslationEnabled({ enabled: true }),
        SettingsActions.setTranslationMode({ mode: 'off' }),
        SettingsActions.setTranslationEnabled({ enabled: false }),
      ]);
    });

    it.each([['off', 'split'], ['split', 'translated-only'], ['translated-only', 'off']] as const)('cycles from %s to %s', (from, to) => {
      create({ translation: settings({ mode: from }) });
      component.cycleTranslationMode();
      expect(dispatched()[0]).toEqual(SettingsActions.setTranslationMode({ mode: to }));
    });

    it('choosing a language while translation is off turns it on in split view', () => {
      create({ translation: settings({ mode: 'off', enabled: false }) });
      component.setTargetLanguage('de');
      expect(dispatched()).toEqual([
        SettingsActions.setTranslationTargetLanguage({ targetLanguage: 'de' }),
        SettingsActions.setTranslationMode({ mode: 'split' }),
        SettingsActions.setTranslationEnabled({ enabled: true }),
      ]);
    });

    it('choosing a language while translating only changes the language', () => {
      create({ translation: settings({ mode: 'translated-only' }) });
      component.setTargetLanguage('de');
      expect(dispatched()).toEqual([SettingsActions.setTranslationTargetLanguage({ targetLanguage: 'de' })]);
    });

    it('reads the language from the select element, and ignores an empty choice', () => {
      create();
      component.onTargetLanguageSelect({ target: { value: 'it' } } as unknown as Event);
      component.onTargetLanguageSelect({ target: { value: '' } } as unknown as Event);
      expect(dispatched()).toEqual([SettingsActions.setTranslationTargetLanguage({ targetLanguage: 'it' })]);
    });

    it('swaps the languages and the panes', () => {
      create();
      component.swapLanguages();
      component.swapPanes();
      expect(dispatched()).toEqual([SettingsActions.swapTranslationLanguages(), SettingsActions.swapCaptionPanes()]);
    });

    it('toggles the split between stacked and side by side', () => {
      create({ translation: settings({ splitOrientation: 'vertical' }) });
      component.toggleOrientation();
      expect(dispatched()).toEqual([SettingsActions.setSplitOrientation({ orientation: 'horizontal' })]);
      fixture.destroy();
      create({ translation: settings({ splitOrientation: 'horizontal' }) });
      component.toggleOrientation();
      expect(dispatched()).toEqual([SettingsActions.setSplitOrientation({ orientation: 'vertical' })]);
    });

    it('defaults to stacked panes and the translated PiP feed, and sets the PiP feed', () => {
      create({ translation: settings() });
      expect(component.splitOrientation()).toBe('vertical');
      expect(component.pipContent()).toBe('translated');
      component.setPipContent('split');
      expect(dispatched()).toEqual([SettingsActions.setPipContent({ content: 'split' })]);
    });
  });
});
