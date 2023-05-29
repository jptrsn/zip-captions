import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgIconsModule } from '@ng-icons/core';
import {
  heroBars3,
  heroMicrophone,
  heroPlayCircle,
  heroStopCircle,
} from '@ng-icons/heroicons/outline';
import { StoreModule } from '@ngrx/store';
import { SharedUiModule } from 'shared-ui';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { audioStreamReducers } from './reducers/audio-stream.reducer';
import {
  heroMicrophoneSlash,
  zipCaptionsLogo,
} from './vectors/vectors';
import { StoreDevtools, StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent, 
    HeaderComponent, 
    FooterComponent, 
    HomeComponent,
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
      heroBars3,
      heroMicrophone,
      heroPlayCircle,
      heroStopCircle,
      heroMicrophoneSlash,
      zipCaptionsLogo
    }),
    SharedUiModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature('audioStream', audioStreamReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    })
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
