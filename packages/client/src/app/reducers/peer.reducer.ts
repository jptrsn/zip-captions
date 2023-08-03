import { createReducer, on } from '@ngrx/store';
import { PeerActions } from '../actions/peer.actions';

export const peerFeatureKey = 'peer';

export interface PeerState {
  socketConnected: boolean;
  peerConnected: boolean;
  serverOffline: boolean;
  id?: string
  error?: string;
}

export const defaultPeerState: PeerState = {
  socketConnected: false,
  peerConnected: false,
  serverOffline: false
};

export const peerReducers = createReducer(
  defaultPeerState,
  on(PeerActions.socketServerConnected, (state: PeerState, action: { id: string}) => ({...state, socketConnected: true, id: action.id, serverOffline: false})),
  on(PeerActions.connectSocketServerFailure, (state: PeerState, action: {error: string}) => ({...state, socketConnected: false, serverOffline: true, error: action.error})),
  on(PeerActions.socketServerDisconnected, (state: PeerState) => ({...state, socketConnected: false, id: undefined})),
  
  on(PeerActions.peerServerConnected, (state: PeerState, action: { id: string}) => ({...state, peerConnected: true})),
  on(PeerActions.connectPeerServerFailure, (state: PeerState, action: { error: string}) => ({...state, peerConnected: false, error: action.error})),
  on(PeerActions.peerServerDisconnected, (state: PeerState) => ({...state, peerConnected: false}))
);

