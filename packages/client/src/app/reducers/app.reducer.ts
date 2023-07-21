import { createReducer, on } from '@ngrx/store';
import * as AppActions from '../actions/app.actions';
import { AppAppearanceState, AppPlatform, AppState } from '../models/app.model';
import { defaultAudioStreamState } from './audio-stream.reducer';
import { defaultRecognitionState } from './recognition.reducer';
import { defaultSettingsState } from './settings.reducer';

export const defaultAppAppearance: AppAppearanceState = {
  loading: false,
  cookiesAccepted: false,
  footerVisible: true,
  wakeLock: true,
}

export const defaultAppState: AppState = {
  appearance: defaultAppAppearance,
  settings: defaultSettingsState,
  audioStream: defaultAudioStreamState,
  recognition: defaultRecognitionState,
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
)