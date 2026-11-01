import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { SharedUiModule } from 'shared-ui';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';
import { RecognitionActions } from '../../../../actions/recogntion.actions';
import { selectUserLoggedIn } from '../../../../selectors/auth.selectors';
import { selectProfanityFilterEnabled, selectRecognitionEngineProvider } from '../../../../selectors/recognition.selector';
import { dialectSelector, languageSelector } from '../../../../selectors/settings.selector';
import { selectUserBalance } from '../../../../selectors/user.selector';
import { InterfaceLanguage, RecognitionDialect, SettingsActions } from '../../models/settings.model';
import { RecognitionEngineComponent } from './recognition-engine.component';

describe('RecognitionEngineComponent', () => {
  let component: RecognitionEngineComponent;
  let fixture: ComponentFixture<RecognitionEngineComponent>;
  let store: MockStore;
  let dispatch: jest.SpyInstance;

  const create = (opts: { provider?: 'web' | 'azure'; dialect?: RecognitionDialect; language?: InterfaceLanguage; balance?: number; loggedIn?: boolean } = {}) => {
    store.overrideSelector(selectUserLoggedIn, opts.loggedIn ?? true);
    store.overrideSelector(selectRecognitionEngineProvider, opts.provider ?? 'web');
    store.overrideSelector(dialectSelector, opts.dialect ?? 'en-US');
    store.overrideSelector(languageSelector, opts.language ?? 'en');
    store.overrideSelector(selectProfanityFilterEnabled, false);
    store.overrideSelector(selectUserBalance, opts.balance as number);
    store.refreshState();
    fixture = TestBed.createComponent(RecognitionEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [...TestingModuleProviders],
      imports: [...TestingModuleImports, SharedUiModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [RecognitionEngineComponent],
    }).compileComponents();
    store = TestBed.inject(Store) as MockStore;
    dispatch = jest.spyOn(store, 'dispatch');
  });

  it('starts with the stored engine selected', () => {
    create({ provider: 'azure', balance: 600 });
    expect(component.group.controls.provider.value).toBe('azure');
    expect(component.selectedOption()?.value).toBe('azure');
  });

  describe('validation', () => {
    it('lets the free engine through with no credits', () => {
      create({ provider: 'web' });
      expect(component.validateProviderAndDialect(component.group)).toBeNull();
    });

    it('requires credits for the paid engine', () => {
      create({ provider: 'azure', balance: 0 });
      expect(component.validateProviderAndDialect(component.group)).toEqual({ credits: true });
    });

    it('requires a specific dialect for the paid engine', () => {
      create({ provider: 'azure', balance: 600 });
      component.group.controls.dialect.setValue('unspecified');
      expect(component.validateProviderAndDialect(component.group)).toEqual({ dialect: true });
    });

    it('accepts the paid engine with credits and a dialect', () => {
      create({ provider: 'azure', balance: 600, dialect: 'fr-CA', language: 'fr' });
      expect(component.validateProviderAndDialect(component.group)).toBeNull();
    });
  });

  describe('balance', () => {
    it('converts tokens to milliseconds at 60 tokens a minute for the paid engine', () => {
      create({ provider: 'azure', balance: 600 });
      expect(component.balance()).toBe(600_000);
    });

    it('is unknown for the free engine and when signed out', () => {
      create({ provider: 'web', balance: 600 });
      expect(component.balance()).toBeUndefined();
      fixture.destroy();
      create({ provider: 'azure', balance: 600, loggedIn: false });
      expect(component.balance()).toBeUndefined();
    });
  });

  describe('dialect', () => {
    it('falls back to the language\'s default dialect while none is chosen', () => {
      create({ dialect: 'unspecified', language: 'de' });
      expect(component.fallbackDialect()).toBe('de-DE');
      expect(component.group.controls.dialect.value).toBe('de-DE');
    });

    it('flags a bilingual Azure dialect', () => {
      create({ provider: 'azure', balance: 600, dialect: 'fr-CA', language: 'fr' });
      expect(component.isBilingual()).toBe(true);
      component.group.controls.dialect.setValue('fr-FR');
      expect(component.isBilingual()).toBe(false);
    });
  });

  describe('saving', () => {
    it('refuses an invalid selection and marks the form touched', () => {
      create({ provider: 'azure', balance: 0 });
      component.setProvider();
      expect(dispatch).not.toHaveBeenCalledWith(expect.objectContaining({ type: RecognitionActions.setEngine.type }));
      expect(component.group.touched).toBe(true);
    });

    it('sets the engine and a changed dialect', () => {
      create({ provider: 'web', dialect: 'en-US' });
      component.group.controls.dialect.setValue('en-GB');
      component.setProvider();
      expect(dispatch).toHaveBeenCalledWith(RecognitionActions.setEngine({ engine: 'web' }));
      expect(dispatch).toHaveBeenCalledWith(SettingsActions.setDialect({ dialect: 'en-GB' }));
    });

    it('does not re-set an unchanged dialect, and sets a changed profanity filter', () => {
      create({ provider: 'web', dialect: 'en-US' });
      component.group.controls.profanityFilterEnabled.setValue(true);
      component.setProvider();
      expect(dispatch).not.toHaveBeenCalledWith(SettingsActions.setDialect({ dialect: 'en-US' }));
      expect(dispatch).toHaveBeenCalledWith(RecognitionActions.setProfanityFilter({ enabled: true }));
    });
  });
});
