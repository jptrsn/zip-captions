import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NgIconsModule } from '@ng-icons/core';
import { Action, Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { Observable, firstValueFrom, lastValueFrom } from 'rxjs';
import { Icons } from 'shared-ui';
import * as DE_TRANSLATIONS from '../assets/i18n/de.json';
import * as EN_TRANSLATIONS from '../assets/i18n/en.json';
import * as FR_TRANSLATIONS from '../assets/i18n/fr.json';
import * as IT_TRANSLATIONS from '../assets/i18n/it.json';
import * as SP_TRANSLATIONS from '../assets/i18n/sp.json';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { CookieModalComponent } from './components/cookie-modal/cookie-modal.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { WelcomeSplashComponent } from './components/welcome-splash/welcome-splash.component';
import { AppState } from './models/app.model';
import { AppTheme, AvailableLanguages, SettingsActions } from './modules/settings/models/settings.model';
import { defaultAppState } from './reducers/app.reducer';
import { languageSelector } from './selectors/settings.selector';
import { MediaModule } from './modules/media/media.module';
import { SettingsModule } from './modules/settings/settings.module';
import { EffectsModule, EffectsRootModule } from '@ngrx/effects';

const actions$ = new Observable<Action>();

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let store: MockStore<AppState>;
  
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          NoopAnimationsModule,
          RouterTestingModule, 
          NgIconsModule.withIcons({
            ...Icons,
          }),
          TranslateTestingModule
            .withTranslations('en', EN_TRANSLATIONS)
            .withTranslations('de', DE_TRANSLATIONS)
            .withTranslations('fr', FR_TRANSLATIONS)
            .withTranslations('it', IT_TRANSLATIONS)
            .withTranslations('sp', SP_TRANSLATIONS),
          MediaModule,
          EffectsModule.forRoot(),
        ],
        declarations: [
          AppComponent, 
          HeaderComponent,
          FooterComponent,
          HomeComponent,
          AboutComponent,
          WelcomeSplashComponent,
          CookieModalComponent,
          PrivacyComponent,
          TermsAndConditionsComponent,
        ],
        providers: [
          provideMockStore({ initialState: defaultAppState }),
          provideMockActions(() => actions$)
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    store = TestBed.get<Store>(Store);
    app = fixture.componentInstance;
    fixture.detectChanges();
  })

  
  it(`should create the app`, waitForAsync(() => {
    expect(app).toBeTruthy();
  }));
  
  it(`should have default 'ZipDark' theme`, waitForAsync(() => {
    expect(app.theme$()).toEqual(AppTheme.ZipDark);
  }));

  it(`should default to English`, waitForAsync(async () => {
    const selected = await firstValueFrom(store.select(languageSelector))
    expect(selected).toEqual('en')
  }))

  it(`should update when language changed`, waitForAsync(async() => {
    for (const language of AvailableLanguages) {
      store.dispatch(SettingsActions.setLanguage({language}))
      const selected = await lastValueFrom(store.select(languageSelector))
      expect(selected).toEqual(language);

    }
  }))


});
