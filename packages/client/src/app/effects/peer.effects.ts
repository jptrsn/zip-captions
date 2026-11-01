import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, filter, map, of, switchMap, take } from 'rxjs';
import { PeerActions } from '../actions/peer.actions';
import { AppState } from '../models/app.model';
import { PeerService } from '../modules/peer/services/peer.service';
import { selectSocketServerConnected } from '../selectors/peer.selectors';


@Injectable()
export class PeerEffects {
  constructor(private actions$: Actions,
              private store: Store<AppState>,
              private peerService: PeerService) {}

  connectSocketServer$ = createEffect(() => 
    this.actions$.pipe(
      ofType(PeerActions.connectSocketServer),
      switchMap(() => this.peerService.connectSocket()),
      map((id) => PeerActions.socketServerUserIdAssigned({id})),
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
      switchMap((value: { allowAnonymous: boolean, myBroadcast?: boolean, roomId?: string }) => this.peerService.joinRoom(value)),
      map((id) => PeerActions.createBroadcastRoomSuccess({id})),
      catchError((err: any) => of(PeerActions.createBroadcastRoomFailure({error: err.message})))
    )
  )

  joinRoom$ = createEffect(() => 
    this.actions$.pipe(
      ofType(PeerActions.joinBroadcastRoom),
      switchMap(({id}) => this.peerService.joinRoom({roomId: id})),
      map(() => PeerActions.joinBroadcastRoomSuccess()),
      catchError((error: any) => of(PeerActions.joinBroadcastRoomFailure({error: error.message})))
    )
  )

  leaveRoom$ = createEffect(() => 
    this.actions$.pipe(
      ofType(PeerActions.leaveBroadcastRoom),
      map(() => this.peerService.leaveSession()),
      map(() => PeerActions.leaveBroadcastRoomSuccess()),
      catchError((error: any) => of(PeerActions.leaveBroadcastRoomFailure({error: error.message})))
    )
  )

  endBroadcast$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PeerActions.endBroadcast),
      switchMap(() => this.peerService.endBroadcast()),
      map(() => PeerActions.endBroadcastSuccess()),
      catchError((error: any) => of(PeerActions.endBroadcastFailure({error: error.message})))
    )
  )

  getBroadcastRooms$ = createEffect(() => 
    this.actions$.pipe(
      ofType(PeerActions.getBroadcastRooms),
      // On a page load that starts on the broadcast screen the request comes before the socket exists
      switchMap(() => this.store.select(selectSocketServerConnected).pipe(filter(Boolean), take(1))),
      map(() => this.peerService.refreshUserRooms()),
      map(() => PeerActions.getBroadcastRoomsRequested())
    )
  )

}
