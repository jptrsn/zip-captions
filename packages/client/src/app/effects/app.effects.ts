import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, tap } from "rxjs";
import { AppActions, AppAppearanceState } from "../models/app.model";
import { BrowserCompatibilityService } from "../services/browser-compatibility.service";
import { StorageService } from "../services/storage.service";
import { SettingsActions } from "../modules/settings/models/settings.model";

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions,
              private browserCompatibilityService: BrowserCompatibilityService,
              private storage: StorageService) {}

  checkUserAgent$ = createEffect(() => 
    this.actions$.pipe(
      ofType(AppActions.checkUserAgent),
      map(() => this.browserCompatibilityService.checkCompatibility()),
      map(()=> AppActions.checkUserAgentComplete())
    )
  )

  init$ = createEffect(() => 
    this.actions$.pipe(
      ofType(AppActions.initAppearance),
      map(() => this.storage.get('appearance')),
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
}