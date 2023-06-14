import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, tap } from "rxjs";
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
      tap(({language}) => console.log('setlanguage', language)),
      tap(({language}) => this.storage.update('settings', 'lang',  language)),
      switchMap(({language}) => this.translate.use(language)),
      map(() => SettingsActions.setLanguageComplete())
    )
  )
}