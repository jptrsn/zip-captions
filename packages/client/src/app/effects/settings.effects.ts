import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, tap } from "rxjs";
import { SettingsActions, SettingsState } from "../modules/settings/models/settings.model";
import { StorageService } from "../services/storage.service";

@Injectable()
export class SettingsEffects {
  constructor(private actions$: Actions,
              private storage: StorageService) {}

  init$ = createEffect(() => 
    this.actions$.pipe(
      ofType(SettingsActions.initSettings),
      tap(() => console.log('init settings')),
      map(() => this.storage.get('settings')),
      tap((settings: SettingsState) => console.log('settings', settings)),
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
      map(({language}) => this.storage.update('settings', 'langauge', language)),
      map(() => SettingsActions.setLanguageComplete())
    )
  )
}