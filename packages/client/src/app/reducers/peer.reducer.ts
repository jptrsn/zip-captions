import { createReducer, on } from '@ngrx/store';
import { PeerActions } from '../actions/peer.actions';

export const peerFeatureKey = 'peer';

export interface PeerState {
  connected: boolean;
  serverOffline: boolean;
  id?: string
}

export const initialState: PeerState = {
  connected: false,
  serverOffline: false
};

export const peerReducers = createReducer(
  initialState,
  on(PeerActions.socketServerConnected, (state: PeerState, action: { id: string}) => ({...state, connected: true, id: action.id, serverOffline: false})),
  on(PeerActions.connectSocketServerFailure, (state: PeerState, action: {error: string}) => ({...state, connected: false, serverOffline: true})),
  on(PeerActions.socketServerDisconnected, (state: PeerState) => ({...state, connected: false, id: undefined}))
);

