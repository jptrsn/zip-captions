import { ObsCaptionInput, obsCannotShowLanguage, obsEffectiveLanguage, resolveObsCaption } from './obs-caption';

describe('obs-caption', () => {
  const base: ObsCaptionInput = {
    feed: 'translated', live: 'hello there', translatedLive: 'hola', translating: true, sourceLanguage: 'en-US', targetLanguage: 'es'
  };
  const resolve = (changes: Partial<ObsCaptionInput>) => resolveObsCaption({ ...base, ...changes });

  describe('resolveObsCaption', () => {
    it('sends the live line on the original feed, even when a translation exists', () => {
      expect(resolve({ feed: 'original' })).toBe('hello there');
    });

    it('sends the translation on the translated feed, not the source', () => {
      expect(resolve({})).toBe('hola');
    });

    it('clears OBS when the live line is empty', () => {
      expect(resolve({ live: '', translatedLive: '' })).toBe('');
      expect(resolve({ feed: 'original', live: '', translatedLive: '' })).toBe('');
    });

    it('sends nothing while the translation is pending or after it failed', () => {
      expect(resolve({ translatedLive: '' })).toBeNull();
    });

    it('sends the live line when it is already in the target language', () => {
      expect(resolve({ sourceLanguage: 'es-MX', targetLanguage: 'es', translatedLive: '' })).toBe('hello there');
    });

    it('sends the original when translation is off or the device cannot translate', () => {
      expect(resolve({ translating: false, translatedLive: '' })).toBe('hello there');
    });
  });

  describe('obsCannotShowLanguage', () => {
    it.each(['ar', 'zh', 'ja', 'ko', 'hi', 'ru', 'uk', 'ar-EG', 'zh-TW'])('is true for %s', (code) => {
      expect(obsCannotShowLanguage(code)).toBe(true);
    });

    it.each(['en', 'es', 'fr', 'de', 'pl', 'tr', 'vi', 'pt-BR', '', undefined])('is false for %s', (code) => {
      expect(obsCannotShowLanguage(code)).toBe(false);
    });
  });

  describe('obsEffectiveLanguage', () => {
    it('is the target only on the translated feed while translating', () => {
      expect(obsEffectiveLanguage({ ...base })).toBe('es');
      expect(obsEffectiveLanguage({ ...base, translating: false })).toBe('en-US');
      expect(obsEffectiveLanguage({ ...base, feed: 'original' })).toBe('en-US');
    });
  });
});
