export enum AudioStreamStatus {
  uninitialized = 'UNINITIALIZED',
  connecting = 'CONNECTING',
  connected = 'CONNECTED',
  disconnected = 'DISCONNECTED',
}

export interface AudioStreamState {
  id: string;
  status: AudioStreamStatus;
  isListening: boolean;
  micLevel: number;
  stream?: MediaStream;
}

export * as AudioStreamActions from '../actions/audio-stream.actions';