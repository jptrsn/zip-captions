import { createAction, props } from "@ngrx/store";

export const connectRecognition = createAction('[Recognition] Connect', props<{id: string}>());
export const disconnectRecognition = createAction('[Recognition] Disconnect', props<{id: string}>());
export const recognitionError = createAction('[Recognition] Error', props<{error: string}>());

export const pauseRecognition = createAction('[Recognition] Pause');
export const pauseRecognitionSuccess = createAction('[Recognition] Pause Success');

export const resumeRecognition = createAction('[Recognition] Resume');
export const resumeRecognitionSuccess = createAction('[Recognition] Resume Success');

export const connectRecognitionSuccess = createAction('[Recognition] Connect success');
export const connectRecognitionFailure = createAction('[Recognition] Connect failure', props<{error: string}>());

export const disconnectRecognitionSuccess = createAction('[Recognition] Disconnect success');
export const disconnectRecognitionFailure = createAction('[Recognition] Disconnect failure', props<{error: string}>());

export const resetRecogntionState = createAction('[Recognition] Reset state');

export const initTranscriptDb = createAction('[Recognition] Init Transcript DB', props<{ userId: string}>());
export const initTranscriptDbSuccess = createAction('[Recognition] Init Transcript DB Success');

export const deInitTranscriptDb = createAction('[Recognition] DeInit Transcript DB');
export const deInitTranscriptDbSuccess = createAction('[Recognition] DeInit Transcript DB Success');

export const initTranscript = createAction('[Recognition] Init Transcript');
export const initTranscriptSuccess = createAction('[Recognition] Init Transcript Success', props<{ transcriptId: number}>());
export const initTranscriptFailure = createAction('[Recognition] Init Transcript Failure', props<{error: string}>());

export const addTranscriptSegment = createAction('[Recognition] Add Transcript Segment', props<{ text: string, start: Date | undefined }>());
export const addTranscriptSegmentSuccess = createAction('[Recognition] Add Transcript Segment Success');
export const addTranscriptSegmentFailure = createAction('[Recognition] Add Transcript Segment Failure', props<{error: string}>());

export const finalizeTranscript = createAction('[Recognition] Finalize Transcript');
export const finalizeTranscriptSuccess = createAction('[Recognition] Finalize Transcript Success');
export const finalizeTranscriptFailure = createAction('[Recognition] Finalize Transcript', props<{error: string}>());

