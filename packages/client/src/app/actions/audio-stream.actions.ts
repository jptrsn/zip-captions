import { createAction, props } from "@ngrx/store";

export const connectStream = createAction('[AudioStream] Connect', props<{id: string}>());
export const disconnectStream = createAction('[AudioStream] Disconnect', props<{id: string}>());
export const startListen = createAction('[AudioStream] Listen Start', props<{id: string}>());
export const stopListen = createAction('[AudioStream] Listen Stop', props<{id: string}>())

export const connectStreamSuccess = createAction('[AudioStream] Connect success', props<{id: string}>())
export const connectStreamFailure = createAction('[AudioStream] Connect failed', props<{error: string}>())

export const disconnectStreamSuccess = createAction('[AudioStream] Disconnect success', props<{id: string}>())
export const audioStreamError = createAction('[AudioStream] Error', props<{error: string}>())