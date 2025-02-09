import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { TranslateService } from '@ngx-translate/core';
import { catchError, map, of, switchMap, tap, withLatestFrom } from "rxjs";
import { AppState } from "../models/app.model";
import { SettingsActions, SettingsState } from "../modules/settings/models/settings.model";
import { defaultSettingsState } from "../reducers/settings.reducer";
import { selectTranscriptionSettings } from "../selectors/settings.selector";
import { StorageService } from "../services/storage.service";
import { RecognitionActions } from "../actions/recogntion.actions";

@Injectable()
export class SettingsEffects {
  constructor(private actions$: Actions,
              private storage: StorageService,
              private translate: TranslateService,
              private store: Store<AppState>) {}

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingsActions.initSettings),
      map(() => {
        const cached = this.storage.get('settings');
        return this._applySettingsToDefault(cached);
      }),
      switchMap((settings: SettingsState) => (settings.transcription.enabled ? [SettingsActions.initSettingsComplete({settings})] : [SettingsActions.initSettingsComplete({settings})]))
    )
  )

  applySettings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingsActions.applySettings),
      map(({ settings }) => {
        this.storage.set('settings', settings);
        return this._applySettingsToDefault(settings);
      }),
      map((settings) => SettingsActions.initSettingsComplete({settings}))
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
      tap(({language}) => this.storage.update('settings', 'lang', language)),
      switchMap(({language}) => this.translate.use(language)),
      map(() => SettingsActions.setLanguageComplete())
    )
  )

	applyDialect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingsActions.setDialect),
      tap(({dialect}) => this.storage.update('settings', 'dialect', dialect)),
      map(() => SettingsActions.setDialectComplete())
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

	saveProvider$ = createEffect(() =>
		this.actions$.pipe(
			ofType(RecognitionActions.setEngine),
			map(({ engine }) => this.storage.update('settings', 'engine', engine)),
			map(() => SettingsActions.saveEngineSuccess())
		)
	)

  saveTranscriptionSettings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingsActions.saveTranscriptionSettings),
      withLatestFrom(this.store.select(selectTranscriptionSettings)),
      map(([{transcription}, transcriptionSettings]) => {
        const update = {...transcriptionSettings, ...transcription};
        delete update.loading;
        this.storage.update('settings', 'transcription', update)
      }),
      map(() => SettingsActions.saveTranscriptionSettingsSuccess()),
      catchError((err) => of(SettingsActions.saveTranscriptionSettingsFailure({ error: err.message })))
    )
  )

  private _applySettingsToDefault(partial: Partial<SettingsState> | null): SettingsState {
    const defaults = {...defaultSettingsState};
    // This ensures that any deprecated properties are pruned from the saved object
    if (partial) {
      for (const k of Object.keys(defaults)) {
        if (k in partial) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore Keys are iteratble
          defaults[k] = partial[k];
        }
      }
    }
    return defaults;
  }

}