import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as InputsActions from './inputs.actions';
import { InputsEffects } from './inputs.effects';

describe('InputsEffects', () => {
  let actions: Observable<Action>;
  let effects: InputsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        InputsEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(InputsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: InputsActions.initInputs() });

      const expected = hot('-a-|', {
        a: InputsActions.loadInputsSuccess({ inputs: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
