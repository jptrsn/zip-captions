import { Inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, forkJoin, from, map, of, switchMap, withLatestFrom } from "rxjs";
import { AppActions, AppState } from "../models/app.model";
import { RecognitionActions } from "../models/recognition.model";
import { RecognitionService } from "../modules/media/services/recognition.service";
import { TranscriptionService } from "../modules/media/services/transcription.service";
import { Store } from "@ngrx/store";
import { selectUserId } from "../selectors/user.selector";
import { AuthActions } from "../actions/auth.actions";
import { SettingsActions } from "../modules/settings/models/settings.model";
import { selectTranscriptionEnabled } from "../selectors/settings.selector";

@Injectable()
export class RecognitionEffects {
  constructor(private actions$: Actions,
              private store: Store<AppState>,
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
      switchMap(() => [RecognitionActions.disconnectRecognitionSuccess(), AppActions.showFooter(), AppActions.releaseWakeLock(), RecognitionActions.finalizeTranscript()]),
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

  initTranscriptDb$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecognitionActions.initTranscriptDb),
      switchMap(({userId}) => this.transcription.initTranscriptDatabase(userId)),
      map(() => RecognitionActions.initTranscriptDbSuccess())
    )
  )

  deInitTranscriptDb$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecognitionActions.deInitTranscriptDb),
      switchMap(() => this.transcription.deInitTranscriptDatabase()),
      map(() => RecognitionActions.deInitTranscriptDbSuccess())
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
      switchMap(({ text, start }) => from(this.transcription.createTranscriptSegment(text, start))
      .pipe(
        map(() => RecognitionActions.addTranscriptSegmentSuccess()),
        catchError((err) => of(RecognitionActions.addTranscriptSegmentFailure({ error: err.message })))
      )
    )
    )
  )

}