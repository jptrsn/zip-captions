import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../modules/auth/services/auth.service';
import { AuthActions } from '../actions/auth.actions';
import { switchMap, map, of, catchError } from 'rxjs';



@Injectable()
export class AuthEffects {


  constructor(private actions$: Actions,
              private authService: AuthService) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({email, password}) => this.authService.login(email, password)
        .pipe(
          map((data) => AuthActions.loginSuccess({data})),
          catchError((err: any) => of(AuthActions.loginFailure({error: err.message})))
        )
      )
    )
  )

  validate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.validate),
      switchMap(({email, password}) => this.authService.validate(email, password)
        .pipe(
          map((data) => AuthActions.validateResponse({data}))
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

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUp),
      switchMap(({email, password}) => this.authService.signUp(email, password)
        .pipe(
          map((data) => AuthActions.signUpSuccess({data})),
          catchError((err: any) => of(AuthActions.signUpFailure({error: err.message})))
        )
      )
    )
  )
}