import { createReducer, on } from '@ngrx/store';
import { PeerActions } from '../actions/peer.actions';

export const peerFeatureKey = 'peer';

export interface PeerState {
  socketConnected: boolean;
  peerConnected: boolean;
  serverOffline: boolean;
  peerConnectionCount: number;
  isBroadcasting: boolean;
  id?: string;
  roomId?: string;
  error?: string;
}

export const defaultPeerState: PeerState = {
  socketConnected: false,
  peerConnected: false,
  serverOffline: false,
  peerConnectionCount: 0,
  isBroadcasting: false
};

export const peerReducers = createReducer(
  defaultPeerState,
  on(PeerActions.socketServerConnected, (state: PeerState) => ({...state, socketConnected: true, serverOffline: false, error: undefined})),
  on(PeerActions.socketServerUserId, (state: PeerState, action: { id: string}) => ({...state, id: action.id})),
  on(PeerActions.connectSocketServerFailure, (state: PeerState, action: {error: string}) => ({...state, socketConnected: false, serverOffline: true, error: action.error})),
  on(PeerActions.socketServerDisconnected, (state: PeerState) => ({...state, socketConnected: false, id: undefined})),
  
  on(PeerActions.peerServerConnected, (state: PeerState) => ({...state, peerConnected: true, error: undefined })),
  on(PeerActions.connectPeerServerFailure, (state: PeerState, action: { error: string}) => ({...state, peerConnected: false, error: action.error})),
  on(PeerActions.peerServerDisconnected, (state: PeerState) => ({...state, peerConnected: false})),

  on(PeerActions.createBroadcastRoomSuccess, (state: PeerState, action: { id: string}) => ({...state, roomId: action.id, isBroadcasting: true})),
  on(PeerActions.createBroadcastRoomFailure, (state: PeerState, action: { error: string}) => ({...state, error: action.error})),

  on(PeerActions.endBroadcastSuccess, (state: PeerState) => ({...state, isBroadcasting: false, roomId: undefined})),
  on(PeerActions.endBroadcastFailure, (state:PeerState, action: { error: string}) => ({...state, isBroadcasting: false, error: action.error})),

  on(PeerActions.updateConnectedPeerCount, (state, action: { count: number}) => ({...state, peerConnectionCount: action.count})),
);

