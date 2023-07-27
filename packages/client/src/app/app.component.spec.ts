import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { Observable, firstValueFrom, lastValueFrom } from 'rxjs';
import { TestingModuleImports, TestingModuleProviders } from '../testing/test-scaffold';
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
import { MediaModule } from './modules/media/media.module';
import { AppTheme, AvailableLanguages, SettingsActions } from './modules/settings/models/settings.model';
import { languageSelector } from './selectors/settings.selector';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let store: MockStore<AppState>;
  
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          ...TestingModuleImports,
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
          ...TestingModuleProviders
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
