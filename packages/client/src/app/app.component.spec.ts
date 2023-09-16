import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EffectsModule } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import '../testing/matchMedia.mock';
import { TestingModuleImports, TestingModuleProviders } from '../testing/test-scaffold';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { CookieModalComponent } from './components/cookie-modal/cookie-modal.component';
import { DetectPwaInstallComponent } from './components/detect-pwa-install/detect-pwa-install.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { OfflineWarningComponent } from './components/offline-warning/offline-warning.component';
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
          ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: false,
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000',
          }),
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
          OfflineWarningComponent,
          DetectPwaInstallComponent,
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
