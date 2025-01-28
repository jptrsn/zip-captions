import { createReducer, on } from '@ngrx/store';
import { RecognitionState, RecognitionStatus } from '../models/recognition.model';
import { RecognitionActions } from '../actions/recognition.actions';


export const defaultRecognitionState: RecognitionState = {
  status: RecognitionStatus.uninitialized,
	engine: {
		provider: 'web',
		initialized: true
	}
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
  on(RecognitionActions.deleteTranscriptDBSuccess, (state: RecognitionState) => ({...state, transcriptInitialized: false})),
	on(RecognitionActions.setEngine, (state: RecognitionState, action: { engine: 'web' | 'azure'}) => ({...state, engine: { provider: action.engine, initialized: (action.engine === 'web'), token: undefined, region: undefined }})),
	on(RecognitionActions.setEngineSuccess, (state: RecognitionState, action: { token: string, region: string } | undefined) => ({...state, engine: { ...state.engine, token: action?.token, region: action?.region }})),
	on(RecognitionActions.setEngineFailure, (state: RecognitionState, action: { error: string }) => ({...state, error: action.error})),
)