import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { SettingsActions, SettingsState } from "../modules/settings/models/settings.model";
import { StorageService } from "../services/storage.service";
import { TranslateService } from '@ngx-translate/core'

@Injectable()
export class SettingsEffects {
  constructor(private actions$: Actions,
              private storage: StorageService,
              private translate: TranslateService) {}

  init$ = createEffect(() => 
    this.actions$.pipe(
      ofType(SettingsActions.initSettings),
      tap(() => console.log('init settings')),
      map(() => this.storage.get('settings')),
      map((settings: SettingsState) => SettingsActions.initSettingsComplete({settings}))
    )
  )

  applyTheme$ = createEffect(() => 
    this.actions$.pipe(
      ofType(SettingsActions.setTheme),
      map(({theme}) => this.storage.update('settings', 'theme', theme)),
      map(() => SettingsActions.setThemeComplete())
    )
  )

  applyLanguage$ = createEffect(() => 
    this.actions$.pipe(
      ofType(SettingsActions.setLanguage),
      tap(({language}) => this.storage.update('settings', 'lang',  language)),
      switchMap(({language}) => this.translate.use(language)),
      map(() => SettingsActions.setLanguageComplete())
    )
  )

  applyWakeLock$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingsActions.updateWakeLockEnabled),
      map(({enabled}) => this.storage.update('settings', 'wakeLock', enabled)),
      map(() => SettingsActions.updateWakeLockEnabledSuccess()),
      catchError((err) => of(SettingsActions.updateWakeLockEnabledFailure({error: err.message})))
    )
  )

  saveTextSize$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingsActions.setTextSize),
      map(({size}) => this.storage.update('settings', 'textSize', size)),
      map(() => SettingsActions.setTextSizeSuccess())
    )
  )
}