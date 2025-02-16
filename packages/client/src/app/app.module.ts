import {
  HttpClient,
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
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
import { TimeagoModule } from 'ngx-timeago';
import { Icons, SharedUiModule } from 'shared-ui';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { AboutComponent } from './components/about/about.component';
import { CookieModalComponent } from './components/cookie-modal/cookie-modal.component';
import { DetectPwaInstallComponent } from './components/detect-pwa-install/detect-pwa-install.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ObsConnectionStatusComponent } from './components/obs-connection-status/obs-connection-status.component';
import { OfflineWarningComponent } from './components/offline-warning/offline-warning.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { ServiceWorkerUpdateComponent } from './components/service-worker-update/service-worker-update.component';
import { SupporterRenderComponent } from './components/supporter-render/supporter-render.component';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { WelcomeSplashComponent } from './components/welcome-splash/welcome-splash.component';
import { AppEffects } from './effects/app.effects';
import { AuthEffects } from './effects/auth.effects';
import { ObsEffects } from './effects/obs.effects';
import { PeerEffects } from './effects/peer.effects';
import { RecognitionEffects } from './effects/recognition.effects';
import { SettingsEffects } from './effects/settings.effects';
import { UserEffects } from './effects/user.effects';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { MediaModule } from './modules/media/media.module';
import { provideExternalUrls } from './providers/external-url.provider';
import { appAppearanceReducers } from './reducers/app.reducer';
import { audioStreamReducers } from './reducers/audio-stream.reducer';
import { authReducer } from './reducers/auth.reducer';
import { obsReducers } from './reducers/obs.reducer';
import { peerReducers } from './reducers/peer.reducer';
import { recognitionReducers } from './reducers/recognition.reducer';
import { settingsReducers } from './reducers/settings.reducer';
import { userReducer } from './reducers/user.reducer';

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
    ServiceWorkerUpdateComponent,
    OfflineWarningComponent,
    DetectPwaInstallComponent,
    ObsConnectionStatusComponent,
    SupporterRenderComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes, {
      initialNavigation: 'enabledBlocking',
      useHash: false,
    }),
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
      peer: peerReducers,
      obs: obsReducers,
      auth: authReducer,
      user: userReducer,
    }),
    EffectsModule.forRoot([
      AppEffects,
      SettingsEffects,
      RecognitionEffects,
      PeerEffects,
      ObsEffects,
      AuthEffects,
      UserEffects,
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 30,
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
    TimeagoModule.forRoot(),
  ],
  providers: [
    provideHttpClient(withInterceptors([JwtInterceptor])),
    provideExternalUrls()
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
