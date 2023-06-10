import { createReducer, on } from '@ngrx/store';
import * as AppActions from '../actions/app.actions';
import { AppAppearanceState, AppState } from '../models/app.model';
import { defaultAudioStreamState } from './audio-stream.reducer';
import { defaultRecognitionState } from './recognition.reducer';
import { defaultSettingsState } from './settings.reducer';

export const defaultAppAppearance: AppAppearanceState = {
  loading: false,
  footerVisible: true,
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
  on(AppActions.checkUserAgentComplete, (state: AppAppearanceState) => ({...state, loading: false})),
  on(AppActions.initAppearance, (state: AppAppearanceState) => ({...state, loading: true})),
  on(AppActions.initAppearanceComplete, (state: AppAppearanceState, action: { appearance: AppAppearanceState }) => ({...state, ...action.appearance, loading: false})),
)