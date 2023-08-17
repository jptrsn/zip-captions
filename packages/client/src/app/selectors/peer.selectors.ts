import { createSelector } from '@ngrx/store';
import { AppState } from '../models/app.model';
import { PeerState } from '../reducers/peer.reducer';

export const selectPeerState = (state: AppState): PeerState => state.peer;

export const selectSocketServerConnected = createSelector(
  selectPeerState,
  (state) => state.socketConnected
)

export const selectPeerServerConnected = createSelector(
  selectPeerState,
  (state) => state.peerConnected
)

export const selectPeerError = createSelector(
  selectPeerState,
  (state) => state.error
)

export const selectMyUserId = createSelector(
  selectPeerState,
  (state) => state.id
)

export const selectRoomId = createSelector(
  selectPeerState,
  (state) => state.roomId
)

export const selectConnectedPeerCount = createSelector(
  selectPeerState,
  (state) => state.peerConnectionCount
)

export const streamIsActive = createSelector(
  selectPeerState,
  (state) => state.isBroadcasting
)