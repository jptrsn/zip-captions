import { AudioStreamState } from "./audio-stream.model";
import { RecognitionState } from "./recognition.model";

export enum AppTheme {
  dark = 'dark',
  acid = 'acid'
}

export interface AppAppearanceState {
  loading: boolean;
  theme: AppTheme;
  footerVisible: boolean;
  error?: string;
}
export interface AppState {
  appearance: AppAppearanceState;
  audioStream: AudioStreamState;
  recognition: RecognitionState;
}

export * as AppActions from '../actions/app.actions';