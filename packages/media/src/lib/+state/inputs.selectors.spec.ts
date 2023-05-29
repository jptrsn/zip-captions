import { InputsEntity } from './inputs.models';
import {
  inputsAdapter,
  InputsPartialState,
  initialInputsState,
} from './inputs.reducer';
import * as InputsSelectors from './inputs.selectors';

describe('Inputs Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getInputsId = (it: InputsEntity) => it.id;
  const createInputsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as InputsEntity);

  let state: InputsPartialState;

  beforeEach(() => {
    state = {
      inputs: inputsAdapter.setAll(
        [
          createInputsEntity('PRODUCT-AAA'),
          createInputsEntity('PRODUCT-BBB'),
          createInputsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialInputsState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Inputs Selectors', () => {
    it('selectAllInputs() should return the list of Inputs', () => {
      const results = InputsSelectors.selectAllInputs(state);
      const selId = getInputsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = InputsSelectors.selectEntity(state) as InputsEntity;
      const selId = getInputsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectInputsLoaded() should return the current "loaded" status', () => {
      const result = InputsSelectors.selectInputsLoaded(state);

      expect(result).toBe(true);
    });

    it('selectInputsError() should return the current "error" state', () => {
      const result = InputsSelectors.selectInputsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
