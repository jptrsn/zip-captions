import { createAction, props } from '@ngrx/store';
import { InputsEntity } from './inputs.models';

export const initInputs = createAction('[Inputs Page] Init');

export const loadInputsSuccess = createAction(
  '[Inputs/API] Load Inputs Success',
  props<{ inputs: InputsEntity[] }>()
);

export const loadInputsFailure = createAction(
  '[Inputs/API] Load Inputs Failure',
  props<{ error: any }>()
);
