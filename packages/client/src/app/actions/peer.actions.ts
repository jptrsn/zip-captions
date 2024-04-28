import { createAction, props } from "@ngrx/store";
import { UserRoom } from "../reducers/user.reducer";

export const PeerActions = {
  connectSocketServer: createAction('[Peer] Connect Socket Server'),
  socketServerConnected: createAction('[Peer] Socket Server Connected'),
  socketServerUserIdAssigned: createAction('[Peer] Socket Server User ID Assigned', props<{id: string}>()),
  connectSocketServerFailure: createAction('[Peer] Connect Socket Server Error', props<{error: string}>()),
  
  disconnectSocketServer: createAction('[Peer] Disconnect Socket Server'),
  socketServerDisconnected: createAction('[Peer] Socket Server Disconnected'),
  
  socketServerMessageReceived: createAction('[Peer] Server Message Received', props<{data: any}>()),
  socketServerError: createAction('[Peer] Socket Server Error Recieved', props<{error: string}>()),

  createBroadcastRoom: createAction('[Peer] Create Broadcast Room', props<{ roomId?: string, myBroadcast?: boolean, allowAnonymous: boolean}>()),
  createBroadcastRoomSuccess: createAction('[Peer] Create Broadcast Room Success', props<{id:string}>()),
  createBroadcastRoomFailure: createAction('[Peer] Create Broadcast Room Failure', props<{error: string}>()),

  endBroadcast: createAction('[Peer] End Broadcast'),
  endBroadcastSuccess: createAction('[Peer] End Broadcast Success'),
  endBroadcastFailure: createAction('[Peer] End Broadcast Failure', props<{error: string}>()),
  
  joinBroadcastRoom: createAction('[Peer] Join Broadcast Room', props<{id: string}>()),
  joinBroadcastRoomSuccess: createAction('[Peer] Join Broadcast Room Success'),
  joinBroadcastRoomFailure: createAction('[Peer] Join Broadcast Room Failure', props<{error: string}>()),

  setJoinCode: createAction('[Peer] Set Join Code', props<{joinCode: string}>()),
  clearJoinCode: createAction('[Peer] Clear Join Code'),

  setBroadcastEndedAt: createAction('[Peer] Set Broadcast Ended At', props<{endedAt: number}>()),
  clearBroadcastEndedAt: createAction('[Peer] Clear Broadcast Ended At'),

  setHostStatus: createAction('[Peer] Set Host Status', props<{hostOnline: boolean}>()),

  leaveBroadcastRoom: createAction('[Peer] Leave Broadcast Room'),
  leaveBroadcastRoomSuccess: createAction('[Peer] Leave Broadcast Room Success'),
  leaveBroadcastRoomFailure: createAction('[Peer] Leave Broadcast Room Failure', props<{error: string}>()),
  
  connectPeerServer: createAction('[Peer] Connect Peer Server'),
  peerServerConnected: createAction('[Peer] Peer Server Connected'),
  connectPeerServerFailure: createAction('[Peer] Connect Peer Server Error', props<{error: string}>()),
  
  peerServerError: createAction('[Peer] Peer Server Error Recieved', props<{error: string}>()),
  
  disconnectPeerServer: createAction('[Peer] Disconnect Peer Server'),
  peerServerDisconnected: createAction('[Peer] Peer Server Disconnected'), 

  connectToRemotePeer: createAction('[Peer] Connect to Remote Peer', props<{id: string}>()),
  connectToRemotePeerSuccess: createAction('[Peer] Connect to Remote Peer Success'),
  connectToRemotePeerFailure: createAction('[Peer] Connect to Remote Peer Failure', props<{error: string}>()),

  acceptPeerConnection: createAction('[Peer] Accept Peer Connection'),
  acceptPeerConnectionSuccess: createAction('[Peer] Peer Connection Accepted'),
  acceptPeerConnectionFailure: createAction('[Peer] Accept Peer Connection Failure', props<{error: string}>()),

  peerMessageReceived: createAction('[Peer] Peer Message Received', props<{data: any}>()),
  updateConnectedPeerCount: createAction('[Peer] Update Connected Peer Count', props<{count: number}>()),

  setBroadcastPausedState: createAction('[Peer] Set Broadcast Paused State', props<{paused: boolean}>()),
  
  setBroadcastRooms: createAction('[Peer] Set Broadcast Rooms', props<{ rooms: UserRoom[] }>()),
  clearBroadcastRooms: createAction('[Peer] Clear Broadcast Rooms'),
}
