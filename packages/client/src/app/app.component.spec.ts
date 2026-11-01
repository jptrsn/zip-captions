import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SwUpdate } from '@angular/service-worker';
import { Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { TranslateService } from '@ngx-translate/core';
import { TestingModuleImports, TestingModuleProviders } from '../testing/test-scaffold';
import { AuthActions } from './actions/auth.actions';
import { RecognitionActions } from './actions/recogntion.actions';
import { setDefaultDialect } from './actions/settings.actions';
import { AppComponent } from './app.component';
import { AppActions } from './models/app.model';
import { AppTheme, AvailableLanguages } from './modules/settings/models/settings.model';
import { windowControlsOverlaySelector } from './selectors/app.selector';
import { selectUserLoggedIn } from './selectors/auth.selectors';
import { selectTranscriptionEnabled, selectUiLanguage, themeSelector } from './selectors/settings.selector';
import { selectUserBalance, selectUserId } from './selectors/user.selector';
import { ObsCaptionFeedService } from './services/obs-connection/obs-caption-feed.service';
import { StorageService } from './services/storage.service';

interface Scenario {
  swEnabled?: boolean;
  userId?: string;
  loggedIn?: boolean;
  transcripts?: boolean;
  balance?: number;
  storedSettings?: Record<string, unknown> | null;
  languages?: string[];
}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let store: MockStore;
  let dispatch: jest.SpyInstance;
  let translate: { reloadLang: jest.Mock; setDefaultLang: jest.Mock; use: jest.Mock };
  const swUpdate = { isEnabled: false };
  const storage = { get: jest.fn() };

  const select = (s: Scenario) => {
    store.overrideSelector(themeSelector, AppTheme.ZipDark);
    store.overrideSelector(selectUiLanguage, 'fr' as never);
    store.overrideSelector(windowControlsOverlaySelector, false);
    store.overrideSelector(selectUserId, s.userId as string);
    store.overrideSelector(selectUserLoggedIn, s.loggedIn ?? false);
    store.overrideSelector(selectTranscriptionEnabled, s.transcripts ?? false);
    store.overrideSelector(selectUserBalance, s.balance as number);
    store.refreshState();
  };
  const create = (s: Scenario = {}) => {
    jest.spyOn(navigator, 'languages', 'get').mockReturnValue(s.languages ?? ['en-US', 'en']);
    swUpdate.isEnabled = s.swEnabled ?? false;
    storage.get.mockReturnValue(s.storedSettings ?? null);
    select(s);
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  };

  beforeEach(async () => {
    translate = { reloadLang: jest.fn(), setDefaultLang: jest.fn(), use: jest.fn() };
    await TestBed.configureTestingModule({
      imports: [...TestingModuleImports],
      providers: [
        ...TestingModuleProviders,
        { provide: TranslateService, useValue: translate },
        { provide: SwUpdate, useValue: swUpdate },
        { provide: StorageService, useValue: storage },
        // Injected only so OBS captions are sent from any page
        { provide: ObsCaptionFeedService, useValue: {} },
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AppComponent],
    }).compileComponents();
    store = TestBed.inject(Store) as MockStore;
    dispatch = jest.spyOn(store, 'dispatch');
  });

  afterEach(() => jest.restoreAllMocks());

  describe('start up', () => {
    it('initialises the appearance, checks the browser and validates the sign-in', () => {
      create();
      expect(dispatch).toHaveBeenCalledWith(AppActions.initAppearance());
      expect(dispatch).toHaveBeenCalledWith(AppActions.checkUserAgent());
      expect(dispatch).toHaveBeenCalledWith(AuthActions.validate());
    });

    it('reloads the translations of every interface language', () => {
      create();
      expect(translate.reloadLang.mock.calls.map(([l]) => l).sort()).toEqual([...AvailableLanguages].sort());
    });
  });

  describe('language and theme', () => {
    it('uses the interface language from the store', () => {
      create();
      expect(translate.use).toHaveBeenCalledWith('fr');
    });

    it('sets the theme on the page', () => {
      create();
      expect(document.documentElement.getAttribute('data-theme')).toBe(AppTheme.ZipDark);
    });

    it('falls back to English when the browser prefers no language we have', () => {
      create({ languages: ['ja-JP', 'ja'] });
      expect(translate.setDefaultLang).toHaveBeenCalledWith('en');
    });

    it('defaults to the first browser language we have', () => {
      create({ languages: ['ja-JP', 'de', 'fr'] });
      expect(translate.setDefaultLang).toHaveBeenCalledWith('de');
    });
  });

  describe('default dialect', () => {
    it('sets the dialect the browser prefers when none is stored', () => {
      create({ languages: ['fr-CA', 'fr'], storedSettings: null });
      expect(dispatch).toHaveBeenCalledWith(setDefaultDialect({ dialect: 'fr-CA' }));
    });

    it('keeps a dialect the user already chose', () => {
      create({ languages: ['fr-CA', 'fr'], storedSettings: { dialect: 'fr-FR' } });
      expect(dispatch).not.toHaveBeenCalledWith(expect.objectContaining({ type: setDefaultDialect.type }));
    });

    it('keeps the dialect unset when the user chose a different language from the browser\'s', () => {
      create({ languages: ['fr-CA', 'fr'], storedSettings: { lang: 'de' } });
      expect(dispatch).not.toHaveBeenCalledWith(expect.objectContaining({ type: setDefaultDialect.type }));
    });

    it('still sets the browser\'s dialect when the stored language is the browser\'s language', () => {
      create({ languages: ['fr-CA', 'fr'], storedSettings: { lang: 'fr' } });
      expect(dispatch).toHaveBeenCalledWith(setDefaultDialect({ dialect: 'fr-CA' }));
    });

    it('sets nothing when the browser prefers no dialect we support', () => {
      create({ languages: ['ja-JP', 'ja'] });
      expect(dispatch).not.toHaveBeenCalledWith(expect.objectContaining({ type: setDefaultDialect.type }));
    });
  });

  describe('update notice', () => {
    it('is shown only when the service worker is enabled', () => {
      create({ swEnabled: true });
      expect(app.renderSwUpdateNotice()).toBe(true);
      expect(fixture.nativeElement.querySelector('app-service-worker-update')).toBeTruthy();
    });

    it('is not shown otherwise', () => {
      create({ swEnabled: false });
      expect(fixture.nativeElement.querySelector('app-service-worker-update')).toBeNull();
    });
  });

  describe('transcripts and engine for a signed-in user', () => {
    it('opens the transcript database for a signed-in user who has transcripts on', () => {
      create({ userId: 'u1', loggedIn: true, transcripts: true });
      expect(dispatch).toHaveBeenCalledWith(RecognitionActions.initTranscriptDB({ userId: 'u1' }));
    });

    it.each([
      ['transcripts are switched off', { userId: 'u1', loggedIn: true, transcripts: false }],
      ['the user is signed out', { userId: 'u1', loggedIn: false, transcripts: true }],
    ])('does not open the transcript database when %s', (_name, scenario) => {
      create(scenario);
      expect(dispatch).not.toHaveBeenCalledWith(expect.objectContaining({ type: RecognitionActions.initTranscriptDB.type }));
    });

    it('switches to the Azure engine for a signed-in user with a credit balance', () => {
      create({ userId: 'u1', loggedIn: true, balance: 600 });
      expect(dispatch).toHaveBeenCalledWith(RecognitionActions.setEngine({ engine: 'azure' }));
    });

    it('keeps the browser engine for a signed-in user with no credit', () => {
      create({ userId: 'u1', loggedIn: true, balance: 0 });
      expect(dispatch).not.toHaveBeenCalledWith(expect.objectContaining({ type: RecognitionActions.setEngine.type }));
    });

    it('closes the transcript database when the user signs out after opening it', () => {
      create({ userId: 'u1', loggedIn: true, transcripts: true });
      select({ userId: 'u1', loggedIn: false, transcripts: true });
      fixture.detectChanges();
      expect(dispatch).toHaveBeenCalledWith(RecognitionActions.deInitTranscriptDB());
    });

    it('has nothing to close when the database was never opened', () => {
      create({ userId: 'u1', loggedIn: false, transcripts: true });
      select({ userId: undefined, loggedIn: false, transcripts: true });
      fixture.detectChanges();
      expect(dispatch).not.toHaveBeenCalledWith(RecognitionActions.deInitTranscriptDB());
    });
  });
});
