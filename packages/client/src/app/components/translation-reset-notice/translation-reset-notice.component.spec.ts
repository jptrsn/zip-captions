import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { TestingModuleImports, TestingModuleProviders } from '../../../testing/test-scaffold';
import { defaultAppState } from '../../reducers/app.reducer';
import { TranslationResetNoticeComponent } from './translation-reset-notice.component';

const stateWith = (lang: string, dialect: string, enabled: boolean) => ({
  ...defaultAppState,
  settings: {
    ...defaultAppState.settings,
    lang,
    dialect,
    translation: { ...defaultAppState.settings.translation, enabled, mode: enabled ? 'split' : 'off' },
  },
}) as typeof defaultAppState;

describe('TranslationResetNoticeComponent', () => {
  let fixture: ComponentFixture<TranslationResetNoticeComponent>;
  let store: MockStore;

  const notice = () => fixture.nativeElement.querySelector('[data-testid="zc-translation-reset-notice"]') as HTMLElement | null;
  const settle = async () => {
    await new Promise((resolve) => setTimeout(resolve, 5));
    fixture.detectChanges();
  };
  const set = async (lang: string, dialect: string, enabled: boolean) => {
    store.setState(stateWith(lang, dialect, enabled));
    await settle();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: TestingModuleImports,
      declarations: [TranslationResetNoticeComponent],
      providers: TestingModuleProviders,
    }).compileComponents();
    store = TestBed.inject(Store) as MockStore;
    store.setState(stateWith('fr', 'fr-CA', true));
    fixture = TestBed.createComponent(TranslationResetNoticeComponent);
    fixture.detectChanges();
    await settle();
  });

  it('says translation was reset when the spoken language changed and translation went off', async () => {
    expect(notice()).toBeNull();
    await set('en', 'unspecified', false);
    expect(notice()).not.toBeNull();
  });

  it('can be dismissed', async () => {
    await set('en', 'unspecified', false);
    (fixture.nativeElement.querySelector('[data-testid="zc-translation-reset-dismiss"]') as HTMLElement).click();
    fixture.detectChanges();
    expect(notice()).toBeNull();
  });

  it('says nothing when translation goes off without a spoken-language change', async () => {
    await set('fr', 'fr-CA', false);
    expect(notice()).toBeNull();
  });

  it('says nothing for another dialect of the same language, or when translation stays on', async () => {
    await set('fr', 'fr-FR', true);
    expect(notice()).toBeNull();
    await set('en', 'unspecified', true);
    expect(notice()).toBeNull();
  });

  it('says nothing when translation was off already', async () => {
    await set('fr', 'fr-CA', false);
    await set('en', 'unspecified', false);
    expect(notice()).toBeNull();
  });
});
