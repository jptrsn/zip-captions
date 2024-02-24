import { Injectable } from "@angular/core";
import { UserService } from "../modules/user/services/user.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthActions } from "../actions/auth.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { UserActions } from "../actions/user.actions";

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions,
              private userService: UserService) {}

    loadUser$ = createEffect(() => 
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        switchMap(({id}) => this.userService.getUserProfile(id)
          .pipe(
            map((profile) => UserActions.getProfileSuccess({ profile })),
            catchError((err) => of(UserActions.getProfileFailure({error: err.message})))
          )
        )
      )
    )

    saveUiSettings$ = createEffect(() =>
      this.actions$.pipe(
        ofType(UserActions.saveSettingsState),
        switchMap(({settings}) => this.userService.saveUiSettings(settings)
          .pipe(
            map(() => UserActions.saveSettingsStateSuccess()),
            catchError((err) => of(UserActions.saveSettingsStateFailure({error: err.message})))
          )
        )
      )
    )
              
}