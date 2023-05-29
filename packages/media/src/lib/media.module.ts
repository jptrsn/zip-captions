import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromInputs from './+state/inputs.reducer';
import { InputsEffects } from './+state/inputs.effects';
import { AudioService } from './services/audio/audio.service';
import { AudioInputSelectComponent } from './components/audio-input-select/audio-input-select.component';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromInputs.INPUTS_FEATURE_KEY,
      fromInputs.inputsReducer
    ),
    EffectsModule.forFeature([InputsEffects]),
  ],
  declarations: [
    AudioInputSelectComponent,
  ],
  exports: [
    AudioInputSelectComponent,
  ],
  providers: [AudioService],
})
export class MediaModule {}
