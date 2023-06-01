import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioInputEnableComponent } from './components/audio-input-enable/audio-input-enable.component';
import { SharedUiModule } from 'shared-ui';
import { EffectsModule } from '@ngrx/effects';
import { AudioStreamEffects } from '../../effects/audio-stream.effects';
import { NgIconsModule } from '@ng-icons/core';
import { BackgroundMagnitudeDirective } from '../../directives/background-magnitude.directive';
import { RecognizedTextComponent } from './components/recognized-text/recognized-text.component';
import { RecognizedLiveTextComponent } from './components/recognized-live-text/recognized-live-text.component';
import { RecognitionEffects } from '../../effects/recognition.effects';

@NgModule({
  declarations: [
    AudioInputEnableComponent,
    RecognizedTextComponent,
    RecognizedLiveTextComponent,
  ],
  imports: [
    CommonModule,
    SharedUiModule,
    EffectsModule.forFeature([AudioStreamEffects, RecognitionEffects]),
    NgIconsModule,
    BackgroundMagnitudeDirective,
  ],
  exports: [
    AudioInputEnableComponent,
    RecognizedTextComponent,
    RecognizedLiveTextComponent,
  ],
})
export class MediaModule {}
