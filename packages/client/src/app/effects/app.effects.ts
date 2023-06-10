import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, tap } from "rxjs";
import { AppActions, AppAppearanceState } from "../models/app.model";
import { BrowserCompatibilityService } from "../services/browser-compatibility.service";
import { StorageService } from "../services/storage.service";

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

  applyTheme$ = createEffect(() => 
    this.actions$.pipe(
      ofType(AppActions.setTheme),
      map(({theme}) => this.storage.update('appearance', 'theme', theme)),
      map(() => AppActions.setThemeComplete())
    )
  )

  init$ = createEffect(() => 
    this.actions$.pipe(
      ofType(AppActions.initAppearance),
      map(() => this.storage.get('appearance')),
      tap((appearance: any) => console.log('appearance', appearance)),
      map((appearance: AppAppearanceState) => AppActions.initAppearanceComplete({appearance}))
    )
  )
}