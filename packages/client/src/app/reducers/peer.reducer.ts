import { createReducer, on } from '@ngrx/store';
import { PeerActions } from '../actions/peer.actions';

export const peerFeatureKey = 'peer';

export interface PeerState {
  connected: boolean;
  id?: string
}

export const initialState: PeerState = {
  connected: false
};

export const peerReducers = createReducer(
  initialState,
  on(PeerActions.socketServerConnected, (state: PeerState, action: { id: string}) => ({...state, connected: true, id: action.id})),
  on(PeerActions.socketServerDisconnected, (state: PeerState) => ({...state, connected: false, id: undefined}))
);

