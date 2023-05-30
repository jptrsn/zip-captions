import { createReducer, on } from '@ngrx/store';
import * as StreamActions from '../actions/audio-stream.actions';
import { AudioStreamState, AudioStreamStatus } from '../models/audio-stream.model';

export const defaultAudioStreamState: AudioStreamState = {
  id: 'default',
  status: AudioStreamStatus.uninitialized,
  isListening: false,
  micLevel: 0
}

export const audioStreamReducers = createReducer(defaultAudioStreamState, 
  on(StreamActions.connectStream, (state: AudioStreamState): AudioStreamState => ({...state, status: AudioStreamStatus.connecting})),
  on(StreamActions.disconnectStream, (state: AudioStreamState): AudioStreamState => ({...state, status: AudioStreamStatus.disconnected})),
  on(StreamActions.startListen, (state: AudioStreamState): AudioStreamState => ({...state, isListening: true})),
  on(StreamActions.stopListen, (state: AudioStreamState): AudioStreamState => ({...state, isListening: false})),
)