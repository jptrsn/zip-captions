import { createReducer, on } from '@ngrx/store';
import { RecognitionActions, RecognitionState, RecognitionStatus } from '../models/recognition.model';


export const defaultRecognitionState: RecognitionState = {
  status: RecognitionStatus.uninitialized
}

export const recognitionReducers = createReducer(defaultRecognitionState,
  on(RecognitionActions.connectRecognition, (state: RecognitionState, action: { id: string}) => ({...state, id: action.id, status: RecognitionStatus.connecting})),
  on(RecognitionActions.disconnectRecognition, (state: RecognitionState, action: { id: string}) => ({...state, id: action.id, status: RecognitionStatus.disconnected, error: undefined})),
  on(RecognitionActions.pauseRecognition, (state: RecognitionState) => ({...state, status: RecognitionStatus.paused})),
  on(RecognitionActions.resumeRecognition, (state: RecognitionState) => ({...state, status: RecognitionStatus.connected})),
  on(RecognitionActions.recognitionError, (state: RecognitionState, action:{ error: string}) => ({...state, error: action.error, status: RecognitionStatus.error })),
  on(RecognitionActions.connectRecognitionSuccess, (state: RecognitionState) => ({...state, status: RecognitionStatus.connected})),
  on(RecognitionActions.connectRecognitionFailure, (state: RecognitionState, action:  {error: string}) => ({...state, status: RecognitionStatus.error, error: action.error})),
  on(RecognitionActions.resetRecogntionState, (state: RecognitionState) => ({...state, status: RecognitionStatus.uninitialized}))
)