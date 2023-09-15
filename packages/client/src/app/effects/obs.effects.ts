import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ObsActions } from '../actions/obs.actions';
import { ObsConnectionService } from '../services/obs-connection/obs-connection.service';
import { catchError, map, of, switchMap, tap } from 'rxjs';

@Injectable()
export class ObsEffects {
  constructor(private actions$: Actions,
              private obsService: ObsConnectionService) {}

  connectServer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ObsActions.connect),
      switchMap((props) => this.obsService.connect(props).pipe(
        map(() => ObsActions.connectSuccess()),
        catchError((err:any) => of(ObsActions.connectFailure({error: err.message || 'Connection Failed for unknown reason'}))))
      ),
      tap((result) => console.log('connect flow finished', result))
    )
  )

  disconnectServer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ObsActions.disconnect),
      switchMap(() => this.obsService.disconnect().pipe(
        map(() => ObsActions.disconnectSuccess()),
        catchError((err: any) => of(ObsActions.disconnectFailure({error: err.message || 'Disconnect Failed for unknown reason'}))),
      )),
    )
  )
}