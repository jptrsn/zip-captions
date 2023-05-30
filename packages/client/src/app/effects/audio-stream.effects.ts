import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AudioStreamActions } from '../models/audio-stream.model';
import { map, mergeMap, of, tap } from "rxjs";
import { MediaService } from "../modules/media/services/media.service";

@Injectable()
export class AudioStreamEffects {
  constructor(private actions$: Actions,
              private mediaService: MediaService) {}

  connectStream$ = createEffect(() => 
    this.actions$.pipe(
      ofType(AudioStreamActions.connectStream), 
      mergeMap((props) => {
        return this.mediaService.getMediaStream(props.id).pipe(
          map((streamId) => AudioStreamActions.connectStreamSuccess({ id: streamId })),
          tap((response) => console.log('got response', response)),
          // catchError((error) => of(AudioStreamActions.connectStreamFailure({ error: error.message})))
        )
      })
    )
  )
  
  disconnectStream$ = createEffect(() => 
  this.actions$.pipe(
    ofType(AudioStreamActions.disconnectStream), 
    map((props) => {
      const disconnectedId = this.mediaService.disconnectStream(props.id);
      return AudioStreamActions.disconnectStreamSuccess({id: disconnectedId})
    })
  ))

}