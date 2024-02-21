import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../modules/auth/services/auth.service';
import { AuthActions } from '../actions/auth.actions';
import { switchMap, map, of, catchError, tap } from 'rxjs';
import { UserActions } from '../actions/user.actions';



@Injectable()
export class AuthEffects {


  constructor(private actions$: Actions,
              private authService: AuthService) {}

  login$ = createEffect(() => 
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(() => this.authService.login()
        .pipe(
          tap((result) => console.log('login result', result)),
          switchMap((id) => [AuthActions.loginSuccess({ id })]),
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

  validate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.validate),
      switchMap(() => this.authService.login().pipe(
        map((id: string | null) => (id ? AuthActions.loginSuccess({ id }) : AuthActions.logoutSuccess())),
        catchError(() => of(AuthActions.logoutSuccess()))
      ))
    )
  )

}