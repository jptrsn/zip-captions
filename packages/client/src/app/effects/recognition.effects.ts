import { Injectable } from "@angular/core";
import { RecognitionService } from "../modules/media/services/recognition.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { RecognitionActions } from "../models/recognition.model";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { AppActions } from "../models/app.model";

@Injectable()
export class RecognitionEffects {
  constructor(private actions$: Actions,
              private recognitionService: RecognitionService) {}

  connectRecognition$ = createEffect(() => 
    this.actions$.pipe(
      ofType(RecognitionActions.connectRecognition),
      map((props) => this.recognitionService.connectToStream(props.id)),
      switchMap(() => [RecognitionActions.connectRecognitionSuccess(), AppActions.hideFooter()]),
      catchError((err: any) => of(RecognitionActions.connectRecognitionFailure({error: err.message})))
    )
  )

  disconnectRecognition$ = createEffect(() => 
    this.actions$.pipe(
      ofType(RecognitionActions.disconnectRecognition),
      map((props) => this.recognitionService.disconnectFromStream(props.id)),
      switchMap(() => [RecognitionActions.disconnectRecognitionSuccess(), AppActions.showFooter()]),
      catchError((err: any) => of(RecognitionActions.disconnectRecognitionFailure({error: err.message})))
    )
  )


}