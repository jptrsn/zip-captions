export enum RecognitionStatus {
  uninitialized = 'UNINITIALIZED',
  connecting = 'CONNECTING',
  connected = 'CONNECTED',
  disconnected = 'DISCONNECTED',
  error = 'ERROR',
}
export interface RecognitionState {
  status: RecognitionStatus;
  id?: string;
  error?: string;
}

export * as RecognitionActions from '../actions/recogntion.actions';