import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import * as InputsActions from './inputs.actions';
import * as InputsFeature from './inputs.reducer';

@Injectable()
export class InputsEffects {
  private actions$ = inject(Actions);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InputsActions.initInputs),
      switchMap(() => of(InputsActions.loadInputsSuccess({ inputs: [] }))),
      catchError((error) => {
        console.error('Error', error);
        return of(InputsActions.loadInputsFailure({ error }));
      })
    )
  );
}
