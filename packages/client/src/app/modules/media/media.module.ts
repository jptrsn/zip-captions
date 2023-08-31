import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgIconsModule } from '@ng-icons/core';
import { EffectsModule } from '@ngrx/effects';
import { SharedUiModule } from 'shared-ui';
import { BackgroundMagnitudeDirective } from '../../directives/background-magnitude.directive';
import { AudioStreamEffects } from '../../effects/audio-stream.effects';
import { RecognitionEffects } from '../../effects/recognition.effects';
import { AudioInputEnableComponent } from './components/audio-input-enable/audio-input-enable.component';
import { RecognitionEnableComponent } from './components/recognition-enable/recognition-enable.component';
import { RecognitionRenderComponent } from './components/recognition-render/recognition-render.component';
import { RecognizedLiveTextComponent } from './components/recognized-live-text/recognized-live-text.component';
import { RecognizedTextComponent } from './components/recognized-text/recognized-text.component';
import { TranslateModule } from '@ngx-translate/core';
import { RecognitionControlSidebarComponent } from './components/recognition-control-sidebar/recognition-control-sidebar.component';

@NgModule({
  declarations: [
    AudioInputEnableComponent,
    RecognizedTextComponent,
    RecognizedLiveTextComponent,
    RecognitionEnableComponent,
    RecognitionRenderComponent,
    RecognitionControlSidebarComponent,
  ],
  imports: [
    CommonModule,
    SharedUiModule,
    EffectsModule.forFeature([AudioStreamEffects, RecognitionEffects]),
    NgIconsModule,
    BackgroundMagnitudeDirective,
    TranslateModule.forChild({ extend: true }),
  ],
  exports: [
    AudioInputEnableComponent,
    RecognizedTextComponent,
    RecognizedLiveTextComponent,
    RecognitionEnableComponent,
    RecognitionRenderComponent,
    RecognitionControlSidebarComponent,
  ],
})
export class MediaModule {}
