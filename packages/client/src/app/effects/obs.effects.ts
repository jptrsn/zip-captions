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
      tap(() => console.log('obs connect event')),
      switchMap((props) => this.obsService.connect(props)),
      tap((result: any) => console.log('obs connect result', result)),
      map((result: any) => ObsActions.connectSuccess()),
      catchError((err:any) => of(ObsActions.connectFailure({error: err.message}))),
      tap((result) => console.log('connect flow finished', result))
    )
  )

  disconnectServer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ObsActions.disconnect),
      switchMap(() => this.obsService.disconnect()),
      map(() => ObsActions.disconnectSuccess()),
      catchError((err: any) => of(ObsActions.disconnectFailure({error: err.message}))),
    )
  )
}