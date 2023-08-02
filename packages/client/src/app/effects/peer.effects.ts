import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PeerService } from '../modules/peer/services/peer.service';
import { PeerActions } from '../actions/peer.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';



@Injectable()
export class PeerEffects {
  constructor(private actions$: Actions,
              private peerService: PeerService) {}

  connectSocketServer$ = createEffect(() => 
    this.actions$.pipe(
      ofType(PeerActions.connectSocketServer),
      switchMap(() => this.peerService.connectSocket()),
      map((id) => PeerActions.socketServerConnected({id})),
      catchError((err: any) => of(PeerActions.connectSocketServerFailure({error: err.message})))
    )
  )

  disconnectSocketServer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PeerActions.disconnectSocketServer),
      switchMap(() => this.peerService.disconnectSocket()),
      map(() => PeerActions.socketServerDisconnected())
    )
  )
}
