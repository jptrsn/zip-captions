import { settingsMatch } from './settings-match';

const defaults = {
  theme: 'dark',
  lang: 'en',
  transcription: { enabled: false },
  translation: { enabled: false, mode: 'off', targetLanguage: 'es', pipContent: 'translated' },
};
type State = typeof defaults;

const current = (): State => ({
  ...defaults,
  transcription: { enabled: true, titlePattern: 'Sunday' } as State['transcription'],
  translation: { enabled: true, mode: 'split', targetLanguage: 'fr', pipContent: 'split', obsFeed: 'translated', dialectByLanguage: { fr: 'fr-CA' } } as State['translation'],
});

/** As Mongoose would return it: schema key order */
const savedAfterSave = () => ({
  theme: 'dark',
  lang: 'en',
  transcription: { titlePattern: 'Sunday', enabled: true },
  translation: { pipContent: 'split', obsFeed: 'translated', dialectByLanguage: { fr: 'fr-CA' }, targetLanguage: 'fr', mode: 'split', enabled: true },
});

describe('settingsMatch', () => {
  it('matches identical state', () => {
    expect(settingsMatch(current(), current(), defaults)).toBe(true);
  });

  it('matches when the saved copy has the same values in another key order', () => {
    expect(settingsMatch(savedAfterSave(), current(), defaults)).toBe(true);
  });

  it('does not match without a saved or current copy', () => {
    expect(settingsMatch(undefined, current(), defaults)).toBe(false);
    expect(settingsMatch(null, current(), defaults)).toBe(false);
    expect(settingsMatch(current(), undefined, defaults)).toBe(false);
  });

  describe('an account saved before transcription and translation were stored', () => {
    const old = { theme: 'dark', lang: 'en' };

    it('matches while the user has the default settings', () => {
      expect(settingsMatch(old, { ...defaults }, defaults)).toBe(true);
    });

    it('does not match once the user has changed them, so Save current is available', () => {
      expect(settingsMatch(old, current(), defaults)).toBe(false);
      expect(settingsMatch(old, { ...defaults, translation: { ...defaults.translation, enabled: true } }, defaults)).toBe(false);
    });
  });

  it('treats a nested key missing from the saved copy as its default', () => {
    const saved = { theme: 'dark', lang: 'en', transcription: { enabled: false }, translation: { enabled: false, mode: 'off', targetLanguage: 'es' } };
    expect(settingsMatch(saved, { ...defaults }, defaults)).toBe(true);
  });

  it('treats undefined, absent and empty-object values as equal', () => {
    const state = { ...current(), translation: { ...current().translation, obsFeed: undefined, dialectByLanguage: {} } };
    const saved = { ...savedAfterSave(), translation: { ...savedAfterSave().translation, obsFeed: undefined } } as Record<string, unknown>;
    delete (saved['translation'] as Record<string, unknown>)['obsFeed'];
    delete (saved['translation'] as Record<string, unknown>)['dialectByLanguage'];
    expect(settingsMatch(saved, state, defaults)).toBe(true);
  });

  it('ignores a saved key the current state does not have', () => {
    expect(settingsMatch({ ...savedAfterSave(), somethingNew: 1 }, current(), defaults)).toBe(true);
  });

  it.each([
    ['translation.targetLanguage', () => ({ ...savedAfterSave(), translation: { ...savedAfterSave().translation, targetLanguage: 'de' } })],
    ['transcription.titlePattern', () => ({ ...savedAfterSave(), transcription: { enabled: true, titlePattern: 'Other' } })],
    ['dialectByLanguage', () => ({ ...savedAfterSave(), translation: { ...savedAfterSave().translation, dialectByLanguage: { fr: 'fr-FR' } } })],
    ['a simple setting', () => ({ ...savedAfterSave(), theme: 'light' })],
  ])('does not match when %s differs', (_name, build) => {
    expect(settingsMatch(build(), current(), defaults)).toBe(false);
  });

  describe('device-specific translation settings', () => {
    it('ignores a saved Picture-in-Picture or OBS value that differs from this device\'s', () => {
      const saved = { ...savedAfterSave(), translation: { ...savedAfterSave().translation, pipContent: 'original', obsFeed: 'original' } };
      expect(settingsMatch(saved, current(), defaults)).toBe(true);
    });

    it('ignores this device\'s own values when the saved copy has none', () => {
      const saved = savedAfterSave() as Record<string, unknown>;
      delete (saved['translation'] as Record<string, unknown>)['pipContent'];
      delete (saved['translation'] as Record<string, unknown>)['obsFeed'];
      expect(settingsMatch(saved, current(), defaults)).toBe(true);
    });
  });
});
