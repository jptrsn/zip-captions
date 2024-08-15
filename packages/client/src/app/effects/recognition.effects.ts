import { Inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, from, map, of, switchMap } from "rxjs";
import { AppActions } from "../models/app.model";
import { RecognitionActions } from "../models/recognition.model";
import { RecognitionService } from "../modules/media/services/recognition.service";
import { TranscriptionService } from "../modules/media/services/transcription.service";

@Injectable()
export class RecognitionEffects {
  constructor(private actions$: Actions,
              @Inject(RecognitionService) private recognitionService: RecognitionService,
              @Inject(TranscriptionService) private transcription: TranscriptionService) {}

  connectRecognition$ = createEffect(() => 
    this.actions$.pipe(
      ofType(RecognitionActions.connectRecognition),
      map((props) => this.recognitionService.connectToStream(props.id)),
      switchMap(() => [RecognitionActions.connectRecognitionSuccess(), AppActions.hideFooter(), AppActions.applyWakeLock(), RecognitionActions.initTranscript()]),
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

  createTranscript$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecognitionActions.initTranscript),
      switchMap(() => from(this.transcription.createTranscript(`${ new Date().toLocaleString() }`))
      .pipe(
        map((transcriptId) => RecognitionActions.initTranscriptSuccess({ transcriptId })),
        catchError((err) => of(RecognitionActions.initTranscriptFailure({ error: err.message })))
      )
    )
    )
  )

  addSegment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecognitionActions.addTranscriptSegment),
      switchMap(({ text }) => from(this.transcription.createTranscriptSegment(text))
      .pipe(
        map(() => RecognitionActions.addTranscriptSegmentSuccess()),
        catchError((err) => of(RecognitionActions.addTranscriptSegmentFailure({ error: err.message })))
      )
    )
    )
  )

}