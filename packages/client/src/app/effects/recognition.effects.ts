import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { AppActions } from "../models/app.model";
import { RecognitionActions } from "../models/recognition.model";
import { RecognitionService } from "../modules/media/services/recognition.service";

@Injectable()
export class RecognitionEffects {
  constructor(private actions$: Actions,
              private recognitionService: RecognitionService) {}

  connectRecognition$ = createEffect(() => 
    this.actions$.pipe(
      ofType(RecognitionActions.connectRecognition),
      map((props) => this.recognitionService.connectToStream(props.id)),
      switchMap(() => [RecognitionActions.connectRecognitionSuccess(), AppActions.hideFooter(), AppActions.applyWakeLock()]),
      catchError((err: any) => of(RecognitionActions.connectRecognitionFailure({error: err.message})))
    )
  )

  disconnectRecognition$ = createEffect(() => 
    this.actions$.pipe(
      ofType(RecognitionActions.disconnectRecognition),
      map((props) => this.recognitionService.disconnectFromStream(props.id)),
      switchMap(() => [RecognitionActions.disconnectRecognitionSuccess(), AppActions.showFooter(), AppActions.releaseWakeLock()]),
      catchError((err: any) => of(RecognitionActions.disconnectRecognitionFailure({error: err.message})))
    )
  )

  pauseRecognition$ = createEffect(() => 
    this.actions$.pipe(
      ofType(RecognitionActions.pauseRecognition),
      map(() => this.recognitionService.pauseRecognition()),
      map(() => RecognitionActions.pauseRecognitionSuccess())
    )
  )

  resumeRecognition$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecognitionActions.resumeRecognition),
      map(() => this.recognitionService.resumeRecognition()),
      map(() => RecognitionActions.resumeRecognitionSuccess())
    )
  )

}