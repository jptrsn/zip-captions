export enum AudioStreamStatus {
  uninitialized = 'UNINITIALIZED',
  connecting = 'CONNECTING',
  connected = 'CONNECTED',
  disconnected = 'DISCONNECTED',
  error = 'ERROR',
}

export interface AudioStreamState {
  id: string;
  status: AudioStreamStatus;
  isListening: boolean;
  stream?: MediaStream;
  error?: string;
}

export * as AudioStreamActions from '../actions/audio-stream.actions';