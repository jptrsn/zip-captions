import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromInputs from './+state/inputs.reducer';
import { InputsEffects } from './+state/inputs.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromInputs.INPUTS_FEATURE_KEY,
      fromInputs.inputsReducer
    ),
    EffectsModule.forFeature([InputsEffects]),
  ],
})
export class MediaModule {}
