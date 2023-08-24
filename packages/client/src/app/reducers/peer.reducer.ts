import { createReducer, on } from '@ngrx/store';
import { PeerActions } from '../actions/peer.actions';

export const peerFeatureKey = 'peer';

export interface PeerState {
  socketConnected?: boolean;
  peerConnected?: boolean;
  serverOffline: boolean;
  peerConnectionCount: number;
  isBroadcasting: boolean;
  id?: string;
  roomId?: string;
  broadcastEndedTimestamp?: number;
  joinCode?: string;
  isViewingBroadcast?: boolean;
  hostOnline?: boolean;
  error?: string;
}

export const defaultPeerState: PeerState = {
  serverOffline: true,
  peerConnectionCount: 0,
  isBroadcasting: false
};

export const peerReducers = createReducer(
  defaultPeerState,
  on(PeerActions.socketServerConnected, (state: PeerState) => ({...state, socketConnected: true, serverOffline: false, error: undefined})),
  on(PeerActions.socketServerUserId, (state: PeerState, action: { id: string}) => ({...state, id: action.id})),
  on(PeerActions.connectSocketServerFailure, (state: PeerState, action: {error: string}) => ({...state, socketConnected: false, serverOffline: true, error: action.error})),
  on(PeerActions.socketServerError, (state: PeerState, action: { error: string}) => ({...state, socketConnected: false, error: action.error })),
  on(PeerActions.socketServerDisconnected, (state: PeerState) => ({...state, socketConnected: false, id: undefined})),
  
  on(PeerActions.peerServerConnected, (state: PeerState) => ({...state, peerConnected: true, error: undefined })),
  on(PeerActions.connectPeerServerFailure, (state: PeerState, action: { error: string}) => ({...state, peerConnected: false, error: action.error})),
  on(PeerActions.peerServerDisconnected, (state: PeerState) => ({...state, peerConnected: false})),
  on(PeerActions.peerServerError, (state: PeerState, action: { error: string}) => ({...state, peerConnected: false, error: action.error })),

  on(PeerActions.createBroadcastRoomSuccess, (state: PeerState, action: { id: string}) => ({...state, roomId: action.id, isBroadcasting: true})),
  on(PeerActions.createBroadcastRoomFailure, (state: PeerState, action: { error: string}) => ({...state, error: action.error})),

  on(PeerActions.setJoinCode, (state: PeerState, action: { joinCode: string}) => ({...state, joinCode: action.joinCode})),
  on(PeerActions.clearJoinCode, (state: PeerState) => ({...state, joinCode: undefined, isViewingBroadcast: undefined})),

  on(PeerActions.setHostStatus, (state: PeerState, action: { hostOnline: boolean}) => ({...state, hostOnline: action.hostOnline })),

  on(PeerActions.joinBroadcastRoom, (state: PeerState, action: { id: string; }) => ({...state, roomId: action.id, broadcastEndedTimestamp: undefined })),
  on(PeerActions.joinBroadcastRoomSuccess, (state: PeerState) => ({...state, isViewingBroadcast: true})),
  on(PeerActions.joinBroadcastRoomFailure, (state: PeerState, action: { error: string}) => ({...state, isViewingBroadcast: false, error: action.error})),

  on(PeerActions.leaveBroadcastRoom, (state: PeerState) => ({...state, roomId: undefined, joinCode: undefined, isViewingBroadcast: false, broadcastEndedTimestamp: undefined})),
  
  on(PeerActions.setBroadcastEndedAt, (state: PeerState, action: { endedAt: number}) => ({...state, broadcastEndedTimestamp: action.endedAt, isViewingBroadcast: false})),
  on(PeerActions.clearBroadcastEndedAt, (state: PeerState) => ({...state, broadcastEndedTimestamp: undefined})),

  on(PeerActions.endBroadcastSuccess, (state: PeerState) => ({...state, isBroadcasting: false, roomId: undefined, joinCode: undefined})),
  on(PeerActions.endBroadcastFailure, (state:PeerState, action: { error: string}) => ({...state, roomId: undefined, joinCode: undefined, isBroadcasting: false, error: action.error})),

  on(PeerActions.updateConnectedPeerCount, (state, action: { count: number}) => ({...state, peerConnectionCount: action.count})),
);

