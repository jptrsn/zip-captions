import { createReducer, on } from '@ngrx/store';
import { RecognitionState, RecognitionStatus } from '../models/recognition.model';
import { RecognitionActions } from '../actions/recogntion.actions';


export const defaultRecognitionState: RecognitionState = {
  status: RecognitionStatus.uninitialized,
	engine: {
		provider: 'web'
	}
}

export const recognitionReducers = createReducer(defaultRecognitionState,
  on(RecognitionActions.connect, (state: RecognitionState, action: { id: string}) => ({...state, id: action.id, status: RecognitionStatus.connecting})),
  on(RecognitionActions.disconnect, (state: RecognitionState, action: { id: string}) => ({...state, id: action.id, status: RecognitionStatus.disconnected, error: undefined})),
	on(RecognitionActions.disconnectFailure, (state: RecognitionState, action: { error: string}) => ({...state, status: RecognitionStatus.disconnected, error: action.error})),
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
  on(RecognitionActions.deleteTranscriptDBSuccess, (state: RecognitionState) => ({...state, transcriptInitialized: false})),
  on(RecognitionActions.loadEngine, (state: RecognitionState) => ({...state, engine: { ...state.engine, loading: true }})),
  on(RecognitionActions.resetEngine, (state: RecognitionState) => ({...state, engine: { ...state.engine, loading: false, provider: "web" as 'web' } })),
	on(RecognitionActions.setEngine, (state: RecognitionState) => ({...state, engine: { ...state.engine, loading: true }})),
	on(RecognitionActions.setEngineSuccess, (state: RecognitionState, action: { engine: 'web' | 'azure'}) => ({...state, engine: { ...state.engine, loading: false, provider: action.engine }})),
	on(RecognitionActions.setEngineFailure, (state: RecognitionState, action: { error: string }) => ({...state, error: action.error})),
)