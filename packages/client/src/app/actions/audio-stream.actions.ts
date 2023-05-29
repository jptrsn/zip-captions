import { createAction } from "@ngrx/store";

// const CONNECT = '[AudioStream] Connect';
// const DISCONNECT = '[AudioStream] Disconnect';
// const LISTEN_START = '[AudioStream] Listen Start';
// const LISTEN_STOP = '[AudioStream] Listen Stop';
// const RESET = '[AudioStream] Reset';

export const connectStream = createAction('[AudioStream] Connect')


// export class StreamConnect implements Action {
//   readonly type = CONNECT;
//   constructor(public id: string) {}
// }

// export class StreamDisconnect implements Action {
//   readonly type = DISCONNECT;
// }

// export class StreamListen implements Action {
//   readonly type = LISTEN_START;
// }

// export class StreamListenStop implements Action {
//   readonly type = LISTEN_STOP;
// }

// export class StreamReset implements Action {
//   readonly type = RESET;
// }

// export type All = 
//   StreamConnect | 
//   StreamDisconnect | 
//   StreamListen | 
//   StreamListenStop |
//   StreamReset;