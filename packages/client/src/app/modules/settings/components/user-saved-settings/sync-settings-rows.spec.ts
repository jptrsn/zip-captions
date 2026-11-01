import { isSimpleSettingValue } from './sync-settings-rows';

describe('isSimpleSettingValue', () => {
  it.each([['text', 'bottom-up'], ['number', 5], ['boolean', true], ['null', null], ['undefined', undefined]])('shows a %s value', (_name, value) => {
    expect(isSimpleSettingValue(value)).toBe(true);
  });

  it.each([['translation', { enabled: true, targetLanguage: 'es' }], ['transcription', { enabled: false }], ['list', [1]]])('leaves out the %s object', (_name, value) => {
    expect(isSimpleSettingValue(value)).toBe(false);
  });
});
