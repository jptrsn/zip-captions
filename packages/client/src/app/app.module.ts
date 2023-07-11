import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule, isDevMode } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgIconsModule } from '@ng-icons/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Icons, SharedUiModule } from 'shared-ui';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { AboutComponent } from './components/about/about.component';
import { CookieModalComponent } from './components/cookie-modal/cookie-modal.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { WelcomeSplashComponent } from './components/welcome-splash/welcome-splash.component';
import { AppEffects } from './effects/app.effects';
import { SettingsEffects } from './effects/settings.effects';
import { MediaModule } from './modules/media/media.module';
import { appAppearanceReducers } from './reducers/app.reducer';
import { audioStreamReducers } from './reducers/audio-stream.reducer';
import { recognitionReducers } from './reducers/recognition.reducer';
import { settingsReducers } from './reducers/settings.reducer';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
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
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    NgIconsModule.withIcons({
      ...Icons,
    }),
    SharedUiModule,
    MediaModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      appearance: appAppearanceReducers,
      audioStream: audioStreamReducers,
      recognition: recognitionReducers,
      settings: settingsReducers,
    }),
    EffectsModule.forRoot([AppEffects]),
    EffectsModule.forFeature([SettingsEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 10,
    }),
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
