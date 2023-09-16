import { obsReducers, defaultObsState } from './obs.reducer';

describe('Obs Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = obsReducers(defaultObsState, action);

      expect(result).toBe(defaultObsState);
    });
  });
});
