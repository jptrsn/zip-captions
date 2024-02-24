import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { SettingsActions, SettingsState } from "../modules/settings/models/settings.model";
import { StorageService } from "../services/storage.service";
import { TranslateService } from '@ngx-translate/core'
import { defaultSettingsState } from "../reducers/settings.reducer";

@Injectable()
export class SettingsEffects {
  constructor(private actions$: Actions,
              private storage: StorageService,
              private translate: TranslateService) {}

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingsActions.initSettings),
      map(() => {
        const cached = this.storage.get('settings');
        const defaults = {...defaultSettingsState};
        // This ensures that any deprecated properties are pruned from the saved object
        for (const k of Object.keys(defaults)) {
          if (k in cached) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore Keys are iteratble
            defaults[k] = cached[k];
          }
        }
        return defaults;
      }),
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
      map(({enabled}) => this.storage.update('settings', 'wakelock', enabled)),
      map(() => SettingsActions.updateWakeLockEnabledSuccess()),
      catchError((err) => of(SettingsActions.updateWakeLockEnabledFailure({error: err.message})))
    )
  )

  saveTextSize$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingsActions.setTextSize),
      map(({size}) => this.storage.update('settings', 'textSize', size)),
      map(() => SettingsActions.setTextSizeSuccess()),
      catchError((err) => of(SettingsActions.setTextSizeFailure({error: err.message})))
    )
  )

  saveLineHeight$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingsActions.setLineHeight),
      map(({height}) => this.storage.update('settings', 'lineHeight', height)),
      map(() => SettingsActions.setLineHeightSuccess()),
      catchError((err) => of(SettingsActions.setLineHeightFailure({error: err.message})))
    )
  )

  saveTextFlow$ = createEffect(() => 
    this.actions$.pipe(
      ofType(SettingsActions.setTextFlow),
      map(({flow}) => this.storage.update('settings', 'textFlow', flow)),
      map(() => SettingsActions.setTextFlowSuccess()),
      catchError((err) => of(SettingsActions.setTextFlowFailure({error: err.message})))
    )
  )

  saveRenderHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingsActions.setRenderHistory),
      map(({count}) => this.storage.update('settings', 'renderHistory', count)),
      map(() => SettingsActions.setRenderHistorySuccess()),
      catchError((err) => of(SettingsActions.setRenderHistoryFailure({error: err.message})))
    )
  )

  saveFontFamily$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingsActions.setFontFamily),
      map(({font}) => this.storage.update('settings', 'fontFamily', font)),
      map(() => SettingsActions.setFontFamilySuccess()),
      catchError((err) => of(SettingsActions.setFontFamilyFailure({error: err.message})))
    )
  )
  
}