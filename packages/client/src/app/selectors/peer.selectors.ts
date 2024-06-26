

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

export const selectServerOffline = createSelector(
  selectPeerState,
  (state) => state.serverOffline
)

export const selectPeerError = createSelector(
  selectPeerState,
  (state) => state.error
)

export const selectMyPeerId = createSelector(
  selectPeerState,
  (state) => state.id
)

export const selectRoomId = createSelector(
  selectPeerState,
  (state) => state.roomId
)

export const selectJoinCode = createSelector(
  selectPeerState,
  (state) => state.joinCode
)

export const selectConnectedPeerCount = createSelector(
  selectPeerState,
  (state) => state.peerConnectionCount
)

export const selectIsBroadcasting = createSelector(
  selectPeerState,
  (state) => state.isBroadcasting
)

export const selectIsViewing = createSelector(
  selectPeerState,
  (state) => state.isViewingBroadcast
)

export const selectHostOnline = createSelector(
  selectPeerState,
  (state) => state.hostOnline
)

export const selectBroadcastEndedTimestamp = createSelector(
  selectPeerState,
  (state) => state.broadcastEndedTimestamp
)

export const selectBroadcastPaused = createSelector(
  selectPeerState,
  (state) => state.broadcastPaused
)

export const selectMyBroadcastRooms = createSelector(
  selectPeerState,
  (state) => state.myUserRooms
)

export const selectAllowAnonymous = createSelector(
  selectPeerState,
  (state) => state.allowAnonymous
)