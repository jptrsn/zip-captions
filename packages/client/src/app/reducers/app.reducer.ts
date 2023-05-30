import { createReducer, on } from '@ngrx/store';
import { AppState, AppTheme } from '../models/app.model';
import { defaultAudioStreamState } from './audio-stream.reducer';
import * as AppActions from '../actions/app.actions';

export const defaultAppState: AppState = {
  loading: false,
  theme: AppTheme.dark,
  audioStream: defaultAudioStreamState,
}

export const appStateReducers = createReducer(defaultAppState,
  on(AppActions.getState, (state: AppState) => state)
)