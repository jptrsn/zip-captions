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
import { SharedUiModule } from 'shared-ui';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import {
  heroMicrophoneSlash,
  zipCaptionsLogo,
} from './vectors/vectors';
import { MediaModule } from 'media';

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
    MediaModule,
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
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
