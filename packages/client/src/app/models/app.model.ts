import { SettingsState } from "../modules/settings/models/settings.model";
import { PeerState } from "../reducers/peer.reducer";
import { AudioStreamState } from "./audio-stream.model";
import { RecognitionState } from "./recognition.model";

export enum AppPlatform {
  mobile = "MOBILE",
  desktop = "DESKTOP",
  unsupported = "UNSUPPORTED",
}

export interface AppAppearanceState {
  loading: boolean;
  cookiesAccepted: boolean;
  peerConnectionsAccepted: boolean;
  cookiesDeclinedTimestamp?: number;
  footerVisible: boolean;
  platform?: AppPlatform;
  warning?: string;
  error?: string;
}
export interface AppState {
  appearance: AppAppearanceState;
  settings: SettingsState;
  audioStream: AudioStreamState;
  recognition: RecognitionState;
  peer: PeerState;
}

interface SubSection {
  text: string,
  list?: string[]
}

export interface PolicySection {
  title: string;
  sections: SubSection[];
}

export * as AppActions from '../actions/app.actions';