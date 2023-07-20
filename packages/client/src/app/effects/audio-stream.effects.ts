import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, of, switchMap, tap } from "rxjs";
import { AudioStreamActions } from '../models/audio-stream.model';
import { RecognitionActions } from "../models/recognition.model";
import { MediaService } from "../modules/media/services/media.service";

@Injectable()
export class AudioStreamEffects {
  constructor(private actions$: Actions,
              private mediaService: MediaService) {}

  connectStream$ = createEffect(() => 
    this.actions$.pipe(
      ofType(AudioStreamActions.connectStream), 
      switchMap((props) => this.mediaService.getMediaStream(props.id)),
      switchMap((streamId: string) => [AudioStreamActions.connectStreamSuccess({ id: streamId }), RecognitionActions.connectRecognition({id: streamId})]),
      catchError((error: {message: string}) => of(AudioStreamActions.connectStreamFailure({error: error.message}))),
    )
  )
  
  disconnectStream$ = createEffect(() => 
  this.actions$.pipe(
    ofType(AudioStreamActions.disconnectStream), 
    switchMap((props) => {
      const disconnectedId = this.mediaService.disconnectStream(props.id);
      return [RecognitionActions.disconnectRecognition(props), AudioStreamActions.disconnectStreamSuccess({id: disconnectedId})]
    })
  ))

}