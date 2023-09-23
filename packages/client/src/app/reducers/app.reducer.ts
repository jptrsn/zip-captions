import { createReducer, on } from '@ngrx/store';
import * as AppActions from '../actions/app.actions';
import { AppAppearanceState, AppPlatform, AppState, Connectivity } from '../models/app.model';
import { defaultAudioStreamState } from './audio-stream.reducer';
import { defaultRecognitionState } from './recognition.reducer';
import { defaultSettingsState } from './settings.reducer';
import { defaultPeerState } from './peer.reducer';
import { defaultObsState } from './obs.reducer';

export const defaultAppAppearance: AppAppearanceState = {
  loading: false,
  cookiesAccepted: false,
  peerConnectionsAccepted: false,
  footerVisible: true,
  connectivity: Connectivity.online,
  windowControlsOverlay: false
}

export const defaultAppState: AppState = {
  appearance: defaultAppAppearance,
  settings: defaultSettingsState,
  audioStream: defaultAudioStreamState,
  recognition: defaultRecognitionState,
  peer: defaultPeerState,
  obs: defaultObsState,
}

export const appAppearanceReducers = createReducer(
  defaultAppAppearance,
  on(AppActions.hideFooter, (state: AppAppearanceState) => ({...state, footerVisible: false})),
  on(AppActions.showFooter, (state: AppAppearanceState) => ({...state, footerVisible: true})),
  on(AppActions.checkUserAgent, (state: AppAppearanceState) => ({...state, loading: true})),
  on(AppActions.checkUserAgentComplete, (state: AppAppearanceState, action: {error?: string, warning?: string, platform: AppPlatform}) => ({...state, loading: false, error: action.error, warning: action.warning, platform: action.platform})),
  on(AppActions.initAppearance, (state: AppAppearanceState) => ({...state, loading: true})),
  on(AppActions.initAppearanceComplete, (state: AppAppearanceState, action: { appearance: AppAppearanceState }) => ({...state, ...action.appearance, loading: false})),
  on(AppActions.acceptCookies, (state: AppAppearanceState) => ({...state, cookiesAccepted: true})),
  on(AppActions.declineCookies, (state: AppAppearanceState) => ({...state, cookiesAccepted: false, cookiesDeclinedTimestamp: Date.now()})),
  on(AppActions.setPeerConnectionsAccepted, (state: AppAppearanceState, action: { accepted: boolean }) => ({...state, peerConnectionsAccepted: action.accepted})),
  on(AppActions.clearAppError, (state: AppAppearanceState) => ({...state, error: undefined})),
  on(AppActions.updateConnectivityState, (state: AppAppearanceState, action: { connectivity: Connectivity}) => ({...state, connectivity: action.connectivity })),
  on(AppActions.updateWindowsOverlayState, (state: AppAppearanceState, action: { visible: boolean}) => ({...state, windowControlsOverlay: action.visible })),
)