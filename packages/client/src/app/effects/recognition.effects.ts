import { Inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, from, map, of, switchMap } from "rxjs";
import { RecognitionActions } from '../actions/recognition.actions';
import { AppActions } from "../models/app.model";
import { RecognitionService } from "../modules/media/services/recognition.service";
import { TranscriptionService } from "../modules/media/services/transcription.service";

@Injectable()
export class RecognitionEffects {
  constructor(private actions$: Actions,
              @Inject(RecognitionService) private recognitionService: RecognitionService,
              @Inject(TranscriptionService) private transcription: TranscriptionService) {}

  connectRecognition$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecognitionActions.connect),
      map((props) => this.recognitionService.connectToStream()),
      switchMap(() => [RecognitionActions.connectSuccess(), AppActions.hideFooter(), AppActions.applyWakeLock(), RecognitionActions.initTranscript()]),
      catchError((err: any) => of(RecognitionActions.connectFailure({error: err.message})))
    )
  )

  disconnectRecognition$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecognitionActions.disconnect),
      map((props) => this.recognitionService.disconnectFromStream()),
      switchMap(() => [RecognitionActions.disconnectSuccess(), AppActions.showFooter(), AppActions.releaseWakeLock(), RecognitionActions.finalizeTranscript()]),
      catchError((err: any) => of(RecognitionActions.disconnectFailure({error: err.message})))
    )
  )

  pauseRecognition$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecognitionActions.pause),
      map(() => this.recognitionService.pauseRecognition()),
      map(() => RecognitionActions.pauseSuccess())
    )
  )

  pauseRecognitionOnError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecognitionActions.error),
      map(() => this.recognitionService.pauseRecognition()),
      map(() => RecognitionActions.pauseSuccess())
    )
  )

  resumeRecognition$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecognitionActions.resume),
      map(() => this.recognitionService.resumeRecognition()),
      map(() => RecognitionActions.resumeSuccess())
    )
  )

  initTranscriptDb$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecognitionActions.initTranscriptDB),
      switchMap(({userId}) => this.transcription.initTranscriptDatabase(userId)),
      map(() => RecognitionActions.initTranscriptDBSuccess())
    )
  )

  deInitTranscriptDb$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecognitionActions.deInitTranscriptDB),
      switchMap(() => this.transcription.deInitTranscriptDatabase()),
      map(() => RecognitionActions.deInitTranscriptDBSuccess())
    )
  )

  createTranscript$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecognitionActions.initTranscript),
      switchMap(() => from(this.transcription.createTranscript())
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
      switchMap(({ text, start }) => from(this.transcription.createTranscriptSegment(text, start))
      .pipe(
        map(() => RecognitionActions.addTranscriptSegmentSuccess()),
        catchError((err) => of(RecognitionActions.addTranscriptSegmentFailure({ error: err.message })))
      )
    )
    )
  )

  finalizeTranscript$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecognitionActions.finalizeTranscript),
      switchMap(() => this.transcription.finalizeTranscript()
      .pipe(
        map(() => RecognitionActions.finalizeTranscriptSuccess()),
        catchError((err) => of(RecognitionActions.finalizeTranscriptFailure({ error: err.message })))
      )
    )
    )
  )

  deleteTranscriptDatabase$ = createEffect(() =>
  this.actions$.pipe(
    ofType(RecognitionActions.deleteTranscriptDB),
    switchMap(() => this.transcription.deleteDatabase()
    .pipe(
        map(() => RecognitionActions.deleteTranscriptDBSuccess()),
        catchError((err) => of(RecognitionActions.deleteTranscriptDBError({ error: err.message })))
      )
    )
    )
  )

}