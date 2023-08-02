import { createAction, props } from "@ngrx/store";

export const PeerActions = {
  connectSocketServer: createAction('[Peer] Connect Socket Server'),
  socketServerConnected: createAction('[Peer] Socket Server Connected', props<{id: string}>()),
  connectSocketServerFailure: createAction('[Peer] Connect Socket Server Error', props<{error: string}>()),
  disconnectSocketServer: createAction('[Peer] Disconnect Socket Server'),
  socketServerDisconnected: createAction('[Peer] Socket Server Disconnected'),
  socketServerMessageReceived: createAction('[Peer] Server Message Received', props<{data: any}>()),
  createBroadcastRoom: createAction('[Peer] Create Broadcast Room'),
  createBroadcastRoomSuccess: createAction('[Peer] Create Broadcast Room Success', props<{id:string}>()),
  createBroadcastRoomFailure: createAction('[Peer] Create Broadcast Room Failure', props<{error: string}>()),
  joinBroadcastRoom: createAction('[Peer] Join Broadcast Room', props<{id: string}>()),
  joinBroadcastRoomSuccess: createAction('[Peer] Join Broadcast Room Success'),
  joinBroadcastRoomFailure: createAction('[Peer] Join Broadcast Room Failure', props<{error: string}>()),
  connectPeer: createAction('[Peer] Connect Peer', props<{id: string}>()),
  connectPeerSuccess: createAction('[Peer] Connect Peer Success'),
  connectPeerFailure: createAction('[Peer] Connect Peer Failure', props<{error: string}>())
}
