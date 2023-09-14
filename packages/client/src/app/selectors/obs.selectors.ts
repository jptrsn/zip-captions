import { createSelector } from '@ngrx/store';
import { AppState } from '../models/app.model';
import { ObsState } from '../reducers/obs.reducer';

export const selectObsState = (state: AppState): ObsState => state.obs;

export const selectObsConnected = createSelector(
  selectObsState,
  (state) => state.connected
)

export const selectObsWebsocketIp = createSelector(
  selectObsState,
  (state) => state.socketIp
)

export const selectObsWebsocketPort = createSelector(
  selectObsState,
  (state) => state.socketPort
)

export const selectObsWebsocketPassword = createSelector(
  selectObsState,
  (state) => state.socketPassword
)

export const selectObsError = createSelector(
  selectObsState,
  (state) => state.error
)