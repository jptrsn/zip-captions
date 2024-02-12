import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../modules/auth/services/auth.service';
import { AuthActions } from '../actions/auth.actions';
import { switchMap, map, of, catchError } from 'rxjs';



@Injectable()
export class AuthEffects {


  constructor(private actions$: Actions,
              private authService: AuthService) {}

              /*
  validate$ = createEffect(() =>
  // TODO: Modify validate to verify jwt
    this.actions$.pipe(
      ofType(AuthActions.validate),
      switchMap(({email, password}) => this.authService.validate(email, password)
        .pipe(
          map((data) => AuthActions.validateResponse({data}))
        )
      )
    )
  )
  */

  login$ = createEffect(() => 
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({token}) => this.authService.login(token)
        .pipe(
          map((result) => AuthActions.loginSuccess({ data: result })),
          catchError((err) => of(AuthActions.loginFailure({ error: err.message})))
        )
      )
    )
  )

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      switchMap(() => this.authService.logout()
        .pipe(
          map(() => AuthActions.logoutSuccess()),
          catchError((err) => of(AuthActions.logoutFailure({error: err.message})))
        )
      )
    )
  )

}