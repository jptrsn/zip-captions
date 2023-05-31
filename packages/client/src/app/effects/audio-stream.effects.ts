import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { AudioStreamActions } from '../models/audio-stream.model';
import { MediaService } from "../modules/media/services/media.service";

@Injectable()
export class AudioStreamEffects {
  constructor(private actions$: Actions,
              private mediaService: MediaService) {}

  connectStream$ = createEffect(() => 
    this.actions$.pipe(
      ofType(AudioStreamActions.connectStream), 
      tap((props) => console.log('connect stream', props)),
      switchMap((props) => this.mediaService.getMediaStream(props.id)),
      map((streamId: string) => AudioStreamActions.connectStreamSuccess({ id: streamId })),
      catchError((error: {message: string}) => of(AudioStreamActions.connectStreamFailure({error: error.message}))),
    )
  )
  
  disconnectStream$ = createEffect(() => 
  this.actions$.pipe(
    ofType(AudioStreamActions.disconnectStream), 
    tap((props) => console.log('disconnect stream', props)),
    map((props) => {
      const disconnectedId = this.mediaService.disconnectStream(props.id);
      return AudioStreamActions.disconnectStreamSuccess({id: disconnectedId})
    })
  ))

}