import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgIconsModule } from '@ng-icons/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { Icons, SharedUiModule } from 'shared-ui';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { AboutComponent } from './components/about/about.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { MediaModule } from './modules/media/media.module';
import { appAppearanceReducers } from './reducers/app.reducer';
import { audioStreamReducers } from './reducers/audio-stream.reducer';
import { recognitionReducers } from './reducers/recognition.reducer';
import { AppEffects } from './effects/app.effects';
import { WelcomeSplashComponent } from './components/welcome-splash/welcome-splash.component';
import { ThemeSelectorComponent } from './components/theme-selector/theme-selector.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    WelcomeSplashComponent,
    ThemeSelectorComponent,
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
    }),
    EffectsModule.forRoot([AppEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 10,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
