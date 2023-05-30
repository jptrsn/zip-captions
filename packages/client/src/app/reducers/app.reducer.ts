import { Action, createReducer, on } from '@ngrx/store';
import { AppAppearanceState, AppState, AppTheme } from '../models/app.model';
import { defaultAudioStreamState } from './audio-stream.reducer';
import * as AppActions from '../actions/app.actions';

export const defaultAppAppearance: AppAppearanceState = {
  loading: false,
  theme: AppTheme.dark,
  footerVisible: true,
}

export const defaultAppState: AppState = {
  appearance: defaultAppAppearance,
  audioStream: defaultAudioStreamState,
}

export const appAppearanceReducers = createReducer(
  defaultAppAppearance,
  on(AppActions.setTheme, (state: AppAppearanceState) => ({...state })),
  on(AppActions.hideFooter, (state: AppAppearanceState) => ({...state, footerVisible: false})),
  on(AppActions.showFooter, (state: AppAppearanceState) => ({...state, footerVisible: true}))
)