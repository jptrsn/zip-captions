import { SettingsState } from "../modules/settings/models/settings.model";
import { AuthState } from "../reducers/auth.reducer";
import { ObsState } from "../reducers/obs.reducer";
import { PeerState } from "../reducers/peer.reducer";
import { UserState } from "../reducers/user.reducer";
import { AudioStreamState } from "./audio-stream.model";
import { RecognitionState } from "./recognition.model";

export enum AppPlatform {
  mobile = "MOBILE",
  desktop = "DESKTOP",
  unsupported = "UNSUPPORTED",
}

export enum Connectivity {
  online = "ONLINE",
  offline = "OFFLINE"
}

export interface AppAppearanceState {
  loading: boolean;
  cookiesAccepted: boolean;
  peerConnectionsAccepted: boolean;
  connectivity: Connectivity;
  windowControlsOverlay: boolean;
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
  obs: ObsState;
  auth: AuthState;
  user: UserState;
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