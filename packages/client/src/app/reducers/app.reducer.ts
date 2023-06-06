import { createReducer, on } from '@ngrx/store';
import * as AppActions from '../actions/app.actions';
import { AppAppearanceState, AppState, AppTheme } from '../models/app.model';
import { defaultAudioStreamState } from './audio-stream.reducer';
import { defaultRecognitionState } from './recognition.reducer';

export const defaultAppAppearance: AppAppearanceState = {
  loading: false,
  theme: AppTheme.dark,
  footerVisible: true,
}

export const defaultAppState: AppState = {
  appearance: defaultAppAppearance,
  audioStream: defaultAudioStreamState,
  recognition: defaultRecognitionState,
}

export const appAppearanceReducers = createReducer(
  defaultAppAppearance,
  on(AppActions.setTheme, (state: AppAppearanceState, action: { theme: AppTheme }) => ({...state, theme: action.theme })),
  on(AppActions.hideFooter, (state: AppAppearanceState) => ({...state, footerVisible: false})),
  on(AppActions.showFooter, (state: AppAppearanceState) => ({...state, footerVisible: true})),
  on(AppActions.checkUserAgent, (state: AppAppearanceState) => ({...state, loading: true})),
  on(AppActions.checkUserAgentComplete, (state: AppAppearanceState) => ({...state, loading: false})),
  on(AppActions.initAppearance, (state: AppAppearanceState) => ({...state, loading: true})),
  on(AppActions.initAppearanceComplete, (state: AppAppearanceState, action: { appearance: AppAppearanceState }) => ({...state, appearance: action.appearance, loading: false})),
)