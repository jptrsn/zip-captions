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
      switchMap((id) => [PeerActions.socketServerUserId({id}), PeerActions.connectPeerServer()]),
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

  connectPeerServer$ = createEffect(() => 
    this.actions$.pipe(
      ofType(PeerActions.connectPeerServer),
      switchMap(() => this.peerService.connectPeerServer()),
      map((id) => PeerActions.peerServerConnected()),
      catchError((err: any) => of(PeerActions.connectPeerServerFailure({error: err.message})))
    )
  )

  disconnectPeerServer$ = createEffect(() => 
    this.actions$.pipe(
      ofType(PeerActions.disconnectPeerServer),
      switchMap(() => this.peerService.disconnectPeerServer()),
      switchMap(() => [PeerActions.peerServerDisconnected(), PeerActions.disconnectSocketServer()])
    )
  )

  createRoom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PeerActions.createBroadcastRoom),
      switchMap(() => this.peerService.joinRoom()),
      map((id) => PeerActions.createBroadcastRoomSuccess({id})),
      catchError((err: any) => of(PeerActions.createBroadcastRoomFailure({error: err.message})))
    )
  )

}
