import { createReducer, on } from '@ngrx/store';
import * as StreamActions from '../actions/audio-stream.actions';
import { AudioStreamState, AudioStreamStatus } from '../models/audio-stream.model';

// export type Action = StreamActions.All;

const defaultState: AudioStreamState = {
  id: 'default',
  status: AudioStreamStatus.uninitialized,
  isListening: false,
  micLevel: 0
}

export const audioStreamReducers = createReducer(defaultState, on(StreamActions.connectStream, (state: AudioStreamState): AudioStreamState => ({...state, status: AudioStreamStatus.connecting})))