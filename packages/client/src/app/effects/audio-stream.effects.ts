import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { AudioStreamActions } from '../models/audio-stream.model';
import { MediaService } from "../modules/media/services/media.service";
import { RecognitionService } from "../modules/media/services/recognition.service";
import { RecognitionActions } from "../models/recognition.model";

@Injectable()
export class AudioStreamEffects {
  constructor(private actions$: Actions,
              private mediaService: MediaService,
              private recognitionService: RecognitionService) {}

  connectStream$ = createEffect(() => 
    this.actions$.pipe(
      ofType(AudioStreamActions.connectStream), 
      tap((props) => console.log('connect stream', props)),
      switchMap((props) => this.mediaService.getMediaStream(props.id)),
      switchMap((streamId: string) => [AudioStreamActions.connectStreamSuccess({ id: streamId }), RecognitionActions.connectRecognition({id: streamId})]),
      catchError((error: {message: string}) => of(AudioStreamActions.connectStreamFailure({error: error.message}))),
    )
  )
  
  disconnectStream$ = createEffect(() => 
  this.actions$.pipe(
    ofType(AudioStreamActions.disconnectStream), 
    tap((props) => console.log('disconnect stream', props)),
    tap((props) => this.recognitionService.disconnectFromStream(props.id)),
    map((props) => {
      const disconnectedId = this.mediaService.disconnectStream(props.id);
      return AudioStreamActions.disconnectStreamSuccess({id: disconnectedId})
    })
  ))

}