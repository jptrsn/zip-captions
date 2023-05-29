import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  INPUTS_FEATURE_KEY,
  InputsState,
  inputsAdapter,
} from './inputs.reducer';

// Lookup the 'Inputs' feature state managed by NgRx
export const selectInputsState =
  createFeatureSelector<InputsState>(INPUTS_FEATURE_KEY);

const { selectAll, selectEntities } = inputsAdapter.getSelectors();

export const selectInputsLoaded = createSelector(
  selectInputsState,
  (state: InputsState) => state.loaded
);

export const selectInputsError = createSelector(
  selectInputsState,
  (state: InputsState) => state.error
);

export const selectAllInputs = createSelector(
  selectInputsState,
  (state: InputsState) => selectAll(state)
);

export const selectInputsEntities = createSelector(
  selectInputsState,
  (state: InputsState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectInputsState,
  (state: InputsState) => state.selectedId
);

export const selectEntity = createSelector(
  selectInputsEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
