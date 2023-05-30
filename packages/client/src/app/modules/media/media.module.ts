import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioInputEnableComponent } from './components/audio-input-enable/audio-input-enable.component';
import { SharedUiModule } from 'shared-ui';
import { EffectsModule } from '@ngrx/effects';
import { AudioStreamEffects } from '../../effects/audio-stream.effects';
import { NgIconsModule } from '@ng-icons/core';
import { BackgroundMagnitudeDirective } from '../../directives/background-magnitude.directive';

@NgModule({
  declarations: [
    AudioInputEnableComponent,
  ],
  imports: [
    CommonModule,
    SharedUiModule,
    EffectsModule.forFeature([AudioStreamEffects]),
    NgIconsModule,
    BackgroundMagnitudeDirective,
  ],
  exports: [
    AudioInputEnableComponent,
  ],
})
export class MediaModule {}
