import { Injectable } from "@angular/core";
import { UserService } from "../modules/user/services/user.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthActions } from "../actions/auth.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { UserActions } from "../actions/user.actions";
import { SettingsActions } from "../modules/settings/models/settings.model";

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
            map((settings) => UserActions.saveSettingsStateSuccess({ settings })),
            catchError((err) => of(UserActions.saveSettingsStateFailure({error: err.message})))
          )
        )
      )
    )

    getUiSettings$ = createEffect(() => 
      this.actions$.pipe(
        ofType(UserActions.getSettings),
        switchMap(() => this.userService.getUiSettings()
          .pipe(
            map((settings) => UserActions.getSettingsSuccess({ settings })),
            catchError((err) => of(UserActions.getSettingsFailure({error: err.message})))
          )
        )
      )
    )

    loadAndApplyUiSettings$ = createEffect(() => 
      this.actions$.pipe(
        ofType(UserActions.loadAndApplySettings),
        switchMap(() => this.userService.getUiSettings()
          .pipe(
            switchMap((settings) => [UserActions.getSettingsSuccess({ settings }), SettingsActions.applySettings({ settings })]),
            catchError((err) => of(UserActions.loadAndApplySettingsFailure({ error: err.message })))
          )
        )
      )
    )

    saveSyncUiSettings$ = createEffect(() =>
      this.actions$.pipe(
        ofType(UserActions.saveSyncProperty),
        switchMap(({ sync }) => this.userService.saveSyncSetting(sync)
          .pipe(
            map((sync) => UserActions.saveSyncPropertySuccess({ sync })),
            catchError((err) => of(UserActions.saveSyncPropertyFailure({ error: err.message })))
          )
        )
      )
    )
              
}