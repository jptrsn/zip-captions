import { createAction } from "@ngrx/store";

export const connectStream = createAction('[AudioStream] Connect');
export const disconnectStream = createAction('[AudioStream] Disconnect');
export const startListen = createAction('[AudioStream] Listen Start');
export const stopListen = createAction('[AudioStream] Listen Stop')