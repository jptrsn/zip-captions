import { createReducer, on } from '@ngrx/store';
import { AudioStreamState, AudioStreamStatus, AudioStreamActions } from '../models/audio-stream.model';



export const defaultAudioStreamState: AudioStreamState = {
  id: 'default',
  status: AudioStreamStatus.uninitialized,
  isListening: false
}

export const audioStreamReducers = createReducer(defaultAudioStreamState, 
  on(AudioStreamActions.connectStream, (state: AudioStreamState): AudioStreamState => ({...state, status: AudioStreamStatus.connecting})),
  on(AudioStreamActions.disconnectStream, (state: AudioStreamState): AudioStreamState => ({...state, status: AudioStreamStatus.disconnected})),
  on(AudioStreamActions.startListen, (state: AudioStreamState): AudioStreamState => ({...state, isListening: true})),
  on(AudioStreamActions.stopListen, (state: AudioStreamState): AudioStreamState => ({...state, isListening: false})),

  on(AudioStreamActions.connectStreamSuccess, (state: AudioStreamState, action: { id: string }) => ({...state, id: action.id, status: AudioStreamStatus.connected})),
  on(AudioStreamActions.connectStreamFailure, (state: AudioStreamState, action: { error: string}) => ({...state, error: action.error, status: AudioStreamStatus.error})),

  on(AudioStreamActions.disconnectStreamSuccess, (state: AudioStreamState, action: { id: string}) => ({...state, id: action.id, state: AudioStreamStatus.disconnected}))
)