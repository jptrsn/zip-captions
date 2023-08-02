import { createAction, props } from "@ngrx/store";

export const serverConnected = createAction('[Peer] Server Connected');
export const serverDisconnected = createAction('[Peer] Server Disconnected');
export const serverMessageReceived = createAction('[Peer] Server Message Received', props<{data: any}>())