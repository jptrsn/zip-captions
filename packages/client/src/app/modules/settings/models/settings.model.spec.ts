import { applySavedTranslation, BilingualDialects, DeviceSpecificTranslationKeys, isBilingualDialect, isSpokenLanguage, omitDeviceSettings, swapLanguagePair, TranslationSettings } from './settings.model';

describe('settings model', () => {
  describe('BilingualDialects', () => {
    const arabic = ['ar-AE', 'ar-BH', 'ar-DZ', 'ar-IL', 'ar-IQ', 'ar-KW', 'ar-LB', 'ar-LY', 'ar-MA', 'ar-OM', 'ar-PS', 'ar-QA', 'ar-SA', 'ar-SY', 'ar-TN', 'ar-YE'];

    it('lists the Azure locales that also recognize English', () => {
      expect(BilingualDialects['fr-CA']).toEqual(['fr', 'en']);
      expect(BilingualDialects['es-US']).toEqual(['es', 'en']);
      arabic.forEach((dialect) => expect(BilingualDialects[dialect as keyof typeof BilingualDialects]).toEqual(['ar', 'en']));
    });

    it('excludes ar-EG and ar-JO, and treats en-IN as single-language for translation', () => {
      expect(isBilingualDialect('ar-EG')).toBe(false);
      expect(isBilingualDialect('ar-JO')).toBe(false);
      expect(isBilingualDialect('en-IN')).toBe(false);
      expect(isBilingualDialect('fr-FR')).toBe(false);
      expect(isBilingualDialect('fr-CA')).toBe(true);
    });
  });

  it('knows which translation languages can be spoken', () => {
    expect(isSpokenLanguage('fr')).toBe(true);
    expect(isSpokenLanguage('ja')).toBe(false);
  });

  describe('swapLanguagePair', () => {
    it('swaps and remembers the outgoing dialect', () => {
      expect(swapLanguagePair({ lang: 'fr', dialect: 'fr-CA', targetLanguage: 'en' })).toEqual({
        lang: 'en', dialect: 'unspecified', targetLanguage: 'fr', dialectByLanguage: { fr: 'fr-CA' }
      });
    });

    it('uses a remembered dialect for the new spoken language', () => {
      const swapped = swapLanguagePair({ lang: 'en', dialect: 'en-US', targetLanguage: 'fr', dialectByLanguage: { fr: 'fr-CA' } });
      expect(swapped?.dialect).toBe('fr-CA');
    });

    it('returns undefined when the translation language cannot be spoken', () => {
      expect(swapLanguagePair({ lang: 'en', dialect: 'en-US', targetLanguage: 'ko' })).toBeUndefined();
    });
  });

  describe('device-specific translation settings', () => {
    const translation: TranslationSettings = { enabled: true, mode: 'split', targetLanguage: 'fr', paneOrder: 'translated-first', pipContent: 'split', obsFeed: 'translated' };

    it('names the Picture-in-Picture and OBS settings', () => {
      expect([...DeviceSpecificTranslationKeys]).toEqual(['pipContent', 'obsFeed']);
    });

    it('omits them from a settings snapshot, keeping everything else, without changing the original', () => {
      const snapshot = { theme: 'dark', translation };
      expect(omitDeviceSettings(snapshot)).toEqual({ theme: 'dark', translation: { enabled: true, mode: 'split', targetLanguage: 'fr', paneOrder: 'translated-first' } });
      expect(snapshot.translation.pipContent).toBe('split');
    });

    it('leaves a snapshot with no translation settings alone', () => {
      const snapshot = { theme: 'dark' };
      expect(omitDeviceSettings(snapshot)).toBe(snapshot);
    });

    it('applies the saved settings but keeps this device\'s own Picture-in-Picture and OBS settings', () => {
      const existing: Partial<TranslationSettings> = { targetLanguage: 'es', pipContent: 'original', obsFeed: 'original' };
      expect(applySavedTranslation(existing, translation)).toEqual({ ...translation, pipContent: 'original', obsFeed: 'original' });
    });

    it('does not take a saved value for a setting this device has not set, so the default applies', () => {
      const merged = applySavedTranslation({ targetLanguage: 'es' }, translation);
      expect(merged.targetLanguage).toBe('fr');
      expect('pipContent' in merged).toBe(false);
      expect('obsFeed' in merged).toBe(false);
    });

    it('works with no local translation settings at all', () => {
      expect(applySavedTranslation(undefined, translation)).toEqual({ enabled: true, mode: 'split', targetLanguage: 'fr', paneOrder: 'translated-first' });
    });
  });
});
