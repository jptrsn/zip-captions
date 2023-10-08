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
}