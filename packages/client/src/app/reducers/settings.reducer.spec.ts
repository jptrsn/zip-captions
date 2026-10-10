import { SettingsActions } from '../modules/settings/models/settings.model';
import { defaultSettingsState, settingsReducers } from './settings.reducer';

describe('Settings Reducer', () => {
  describe('saveTranscriptionSettingsFailure', () => {
    it('should clear the transcription loading flag and record the error', () => {
      const loadingState = settingsReducers(
        defaultSettingsState,
        SettingsActions.saveTranscriptionSettings({ transcription: { enabled: true } })
      );
      expect(loadingState.transcription.loading).toBe(true);

      const result = settingsReducers(
        loadingState,
        SettingsActions.saveTranscriptionSettingsFailure({ error: 'network down' })
      );

      expect(result.transcription.loading).toBe(false);
      expect(result.transcription.enabled).toBe(true);
      expect((result as any).error).toBe('network down');
    });
  });
});
