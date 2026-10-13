import { UiSettingsSchema } from './ui-settings.model';

describe('UiSettingsSchema', () => {
  it('stores the interface language preference alongside the spoken language', () => {
    expect(UiSettingsSchema.path('lang')?.instance).toBe('String');
    expect(UiSettingsSchema.path('uiLanguage')?.instance).toBe('String');
  });
});
