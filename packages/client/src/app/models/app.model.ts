import { AudioStreamState } from "./audio-stream.model";

export enum AppTheme {
  dark = 'dark',
  acid = 'acid'
}

export interface AppAppearanceState {
  loading: boolean;
  theme: AppTheme;
  footerVisible: boolean;
}
export interface AppState {
  appearance: AppAppearanceState;
  audioStream: AudioStreamState;
}

export * as AppActions from '../actions/app.actions';