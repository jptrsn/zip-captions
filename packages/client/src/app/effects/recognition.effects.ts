import { Injectable } from "@angular/core";
import { RecognitionService } from "../modules/media/services/recognition.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { RecognitionActions } from "../models/recognition.model";
import { catchError, map, of, tap } from "rxjs";

@Injectable()
export class RecognitionEffects {
  constructor(private actions$: Actions,
              private recognitionService: RecognitionService) {}

  connectRecognition$ = createEffect(() => 
    this.actions$.pipe(
      ofType(RecognitionActions.connectRecognition),
      tap((props) => console.log('connect recogntion', props.id)),
      map((props) => this.recognitionService.connectToStream(props.id)),
      map(() => RecognitionActions.connectRecognitionSuccess()),
      catchError((err: any) => of(RecognitionActions.connectRecognitionFailure({error: err.message})))
    )
  )

  disconnectRecognition$ = createEffect(() => 
    this.actions$.pipe(
      ofType(RecognitionActions.disconnectRecognition),
      tap((props) => console.log('disconnect recognition', props.id)),
      map((props) => this.recognitionService.disconnectFromStream(props.id)),
      map(() => RecognitionActions.disconnectRecognitionSuccess()),
      catchError((err: any) => of(RecognitionActions.disconnectRecognitionFailure({error: err.message})))
    )
  )


}