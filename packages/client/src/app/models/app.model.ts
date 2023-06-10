import { SettingsState } from "../modules/settings/models/settings.model";
import { AudioStreamState } from "./audio-stream.model";
import { RecognitionState } from "./recognition.model";

export interface AppAppearanceState {
  loading: boolean;
  footerVisible: boolean;
  error?: string;
}
export interface AppState {
  appearance: AppAppearanceState;
  settings: SettingsState;
  audioStream: AudioStreamState;
  recognition: RecognitionState;
}

export * as AppActions from '../actions/app.actions';