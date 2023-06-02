import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map } from "rxjs";
import { AppActions } from "../models/app.model";
import { BrowserCompatibilityService } from "../services/browser-compatibility.service";

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions,
              private browserCompatibilityService: BrowserCompatibilityService) {}

  checkUserAgent$ = createEffect(() => 
    this.actions$.pipe(
      ofType(AppActions.checkUserAgent),
      map(() => this.browserCompatibilityService.checkCompatibility()),
      map(()=> AppActions.checkUserAgentComplete())
    )
  )
}