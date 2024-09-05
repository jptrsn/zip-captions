import { createReducer, on } from '@ngrx/store';
import { RecognitionState, RecognitionStatus } from '../models/recognition.model';
import { RecognitionActions } from '../actions/recogntion.actions';


export const defaultRecognitionState: RecognitionState = {
  status: RecognitionStatus.uninitialized
}

export const recognitionReducers = createReducer(defaultRecognitionState,
  on(RecognitionActions.connect, (state: RecognitionState, action: { id: string}) => ({...state, id: action.id, status: RecognitionStatus.connecting})),
  on(RecognitionActions.disconnect, (state: RecognitionState, action: { id: string}) => ({...state, id: action.id, status: RecognitionStatus.disconnected, error: undefined})),
  on(RecognitionActions.pauseSuccess, (state: RecognitionState) => ({...state, status: RecognitionStatus.paused})),  
  on(RecognitionActions.resumeSuccess, (state: RecognitionState) => ({...state, status: RecognitionStatus.connected, error: undefined })),
  on(RecognitionActions.error, (state: RecognitionState, action:{ error: string}) => ({...state, error: action.error })),
  on(RecognitionActions.connectSuccess, (state: RecognitionState) => ({...state, status: RecognitionStatus.connected})),
  on(RecognitionActions.connectFailure, (state: RecognitionState, action:  {error: string}) => ({...state, status: RecognitionStatus.error, error: action.error})),
  on(RecognitionActions.resetState, (state: RecognitionState) => ({...state, status: RecognitionStatus.uninitialized})),
  on(RecognitionActions.initTranscriptDBSuccess, (state: RecognitionState) => ({...state, transcriptInitialized: true})),
  on(RecognitionActions.initTranscriptSuccess, (state: RecognitionState, action: { transcriptId: number }) => ({...state, transcriptId: action.transcriptId })),
  on(RecognitionActions.initTranscriptFailure, (state: RecognitionState, action:  {error: string}) => ({...state, status: RecognitionStatus.error, error: action.error})),
  on(RecognitionActions.deInitTranscriptDBSuccess, (state: RecognitionState) => ({...state, transcriptInitialized: false})),
  on(RecognitionActions.deleteTranscriptDBSuccess, (state: RecognitionState) => ({...state, transcriptInitialized: false}))
)