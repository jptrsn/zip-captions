import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as InputsActions from './inputs.actions';
import { InputsEntity } from './inputs.models';

export const INPUTS_FEATURE_KEY = 'inputs';

export interface InputsState extends EntityState<InputsEntity> {
  selectedId?: string | number; // which Inputs record has been selected
  loaded: boolean; // has the Inputs list been loaded
  error?: string | null; // last known error (if any)
}

export interface InputsPartialState {
  readonly [INPUTS_FEATURE_KEY]: InputsState;
}

export const inputsAdapter: EntityAdapter<InputsEntity> =
  createEntityAdapter<InputsEntity>();

export const initialInputsState: InputsState = inputsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const reducer = createReducer(
  initialInputsState,
  on(InputsActions.initInputs, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(InputsActions.loadInputsSuccess, (state, { inputs }) =>
    inputsAdapter.setAll(inputs, { ...state, loaded: true })
  ),
  on(InputsActions.loadInputsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function inputsReducer(state: InputsState | undefined, action: Action) {
  return reducer(state, action);
}
