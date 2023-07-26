import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { AppTheme } from './modules/settings/models/settings.model';
import { defaultAppState } from './reducers/app.reducer';
import { TranslateTestingModule } from 'ngx-translate-testing';
import * as EN_TRANSLATIONS from '../assets/i18n/en.json';
import { NgIconsModule } from '@ng-icons/core';
import { Icons } from 'shared-ui';
import { AboutComponent } from './components/about/about.component';
import { CookieModalComponent } from './components/cookie-modal/cookie-modal.component';
import { HomeComponent } from './components/home/home.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { WelcomeSplashComponent } from './components/welcome-splash/welcome-splash.component';

describe('AppComponent', () => {
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, 
        NgIconsModule.withIcons({
          ...Icons,
        }),
        TranslateTestingModule.withTranslations('en', EN_TRANSLATIONS)
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
      providers: [provideMockStore({ initialState: defaultAppState })],
    }).compileComponents();
  });

  // const store: MockStore<AppState> = TestBed.get<Store>(Store);

  it(`should have default 'ZipDark' theme`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.theme$()).toEqual(AppTheme.ZipDark);
  });
});
