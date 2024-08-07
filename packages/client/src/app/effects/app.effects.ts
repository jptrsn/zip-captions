import { Inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { AppActions, AppAppearanceState } from "../models/app.model";
import { BrowserCompatibilityService } from "../services/browser-compatibility.service";
import { StorageService } from "../services/storage.service";
import { SettingsActions } from "../modules/settings/models/settings.model";
import { WakeLockService } from "../services/wake-lock.service";

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions,
              @Inject(BrowserCompatibilityService) private browserCompatibilityService: BrowserCompatibilityService,
              @Inject(StorageService) private storage: StorageService,
              @Inject(WakeLockService) private wakelockService: WakeLockService ) {}

  checkUserAgent$ = createEffect(() => 
    this.actions$.pipe(
      ofType(AppActions.checkUserAgent),
      map(() => this.browserCompatibilityService.checkCompatibility()),
      map(({platform, browser, error, warning})=> AppActions.checkUserAgentComplete({platform, browser, error, warning}))
    )
  )

  init$ = createEffect(() => 
    this.actions$.pipe(
      ofType(AppActions.initAppearance),
      map(() => {
        const state: AppAppearanceState | undefined = this.storage.get('appearance');
        if (state?.cookiesDeclinedTimestamp) {
          const DECLINE_DEBOUNCE_IN_MS = (1000 * 60 * 60 * 24 * 180); // 180 days
          if (Date.now() - state.cookiesDeclinedTimestamp > DECLINE_DEBOUNCE_IN_MS) {
            delete state.cookiesDeclinedTimestamp;
            this.storage.update('appearance', 'cookiesDeclinedTimestamp', undefined);
          }
        }
        return state as AppAppearanceState;
      }),
      switchMap((appearance: AppAppearanceState) => [SettingsActions.initSettings(), AppActions.initAppearanceComplete({appearance})])
    )
  )

  acceptCookies$ = createEffect(() => 
    this.actions$.pipe(
      ofType(AppActions.acceptCookies),
      map(() => {
        this.storage.update('appearance', 'cookiesAccepted', true);
        this.storage.update('appearance', 'cookiesDeclinedTimestamp', undefined);
      }),
      map(() => AppActions.setCookiePolicyComplete())
    )
  )

  declineCookies$ = createEffect(() => 
    this.actions$.pipe(
      ofType(AppActions.declineCookies),
      map(() => {
        this.storage.update('appearance', 'cookiesAccepted', false);
        this.storage.update('appearance', 'cookiesDeclinedTimestamp', Date.now())
      }),
      map(() => AppActions.setCookiePolicyComplete())
    )
  )

  updateAcceptedPeerConnections = createEffect(() => 
    this.actions$.pipe(
      ofType(AppActions.setPeerConnectionsAccepted),
      map(({accepted, save}) => {
        if (save) {
          this.storage.update('appearance', 'peerConnectionsAccepted', accepted)
        }
      }),
      map(() => AppActions.setPeerConnectionsComplete())
    )
  )

  applyLock$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.applyWakeLock),
      switchMap(() => this.wakelockService.requestLock()),
      map((isLocked: boolean) => AppActions.applyWakeLockSuccess({ isLocked })),
      catchError((err) => of(AppActions.applyWakeLockFailure({error: err.message})))
    )
  )

  releaseLock$ = createEffect(() => 
    this.actions$.pipe(
      ofType(AppActions.releaseWakeLock),
      switchMap(() => this.wakelockService.releaseLock()),
      map(() => AppActions.releaseWakeLockSuccess()),
      catchError((err) => of(AppActions.releaseWakeLockFailure({error: err.message})))
    )
  )
}