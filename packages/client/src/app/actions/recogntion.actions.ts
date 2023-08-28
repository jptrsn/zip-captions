import { createAction, props } from "@ngrx/store";

export const connectRecognition = createAction('[Recognition] Connect', props<{id: string}>());
export const disconnectRecognition = createAction('[Recognition] Disconnect', props<{id: string}>());
export const recognitionError = createAction('[Recognition] Error', props<{error: string}>());

export const connectRecognitionSuccess = createAction('[Recognition] Connect success');
export const connectRecognitionFailure = createAction('[Recognition] Connect failure', props<{error: string}>());

export const disconnectRecognitionSuccess = createAction('[Recognition] Disconnect success');
export const disconnectRecognitionFailure = createAction('[Recognition] Disconnect failure', props<{error: string}>());

export const resetRecogntionState = createAction('[Recognition] Reset state')

