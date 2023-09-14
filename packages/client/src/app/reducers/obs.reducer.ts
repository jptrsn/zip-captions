import { createReducer, on } from '@ngrx/store';
import { ObsActions } from '../actions/obs.actions';

export const obsFeatureKey = 'obs';

export enum ObsConnectionState {
  disconnected = 'DISCONNECTED',
  connecting = 'CONNECTING',
  connected = 'CONNECTED',
  error = 'ERROR'
}

export interface ObsState {
  connected: ObsConnectionState;
  socketIp?: string;
  socketPort?: number;
  socketPassword?: string | null;
  streamingActive?: boolean;
  error?: string;
}

export const defaultObsState: ObsState = {
  connected: ObsConnectionState.disconnected
};

export const obsReducers = createReducer(
  defaultObsState,
  on(ObsActions.connect, (state: ObsState) => ({...state, connected: ObsConnectionState.connecting})),
  on(ObsActions.connectSuccess, (state: ObsState) => ({...state, connected: ObsConnectionState.connected})),
  on(ObsActions.connectFailure, (state: ObsState, action: { error: string}) => ({...state, connected: ObsConnectionState.disconnected, error: action.error})),
  on(ObsActions.disconnectSuccess, (state: ObsState) => ({...state, connected: ObsConnectionState.disconnected})),
  on(ObsActions.setStreamingActive, (state: ObsState, action: { active: boolean}) => ({...state, streamingActive: action.active}))
);

