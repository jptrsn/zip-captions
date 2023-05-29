import { Action } from '@ngrx/store';

import * as InputsActions from './inputs.actions';
import { InputsEntity } from './inputs.models';
import {
  InputsState,
  initialInputsState,
  inputsReducer,
} from './inputs.reducer';

describe('Inputs Reducer', () => {
  const createInputsEntity = (id: string, name = ''): InputsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Inputs actions', () => {
    it('loadInputsSuccess should return the list of known Inputs', () => {
      const inputs = [
        createInputsEntity('PRODUCT-AAA'),
        createInputsEntity('PRODUCT-zzz'),
      ];
      const action = InputsActions.loadInputsSuccess({ inputs });

      const result: InputsState = inputsReducer(initialInputsState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = inputsReducer(initialInputsState, action);

      expect(result).toBe(initialInputsState);
    });
  });
});
