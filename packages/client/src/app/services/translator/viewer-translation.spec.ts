import { AvailableTranslationLanguages } from '../../modules/settings/models/settings.model';
import { coerceViewerTarget, resolveViewerTranslation, viewerLanguageOptions } from './viewer-translation';

describe('resolveViewerTranslation', () => {
  it('uses the broadcaster\'s translation when it offers the chosen language, even on a device that can translate', () => {
    expect(resolveViewerTranslation('fr', ['fr'], true)).toBe('broadcaster');
    expect(resolveViewerTranslation('fr', ['fr'], false)).toBe('broadcaster');
  });

  it('matches on the base language', () => {
    expect(resolveViewerTranslation('fr-CA', ['fr'], false)).toBe('broadcaster');
    expect(resolveViewerTranslation('fr', ['fr-CA'], false)).toBe('broadcaster');
  });

  it('translates on the viewer\'s device when the language is not offered and the device can', () => {
    expect(resolveViewerTranslation('es', ['fr'], true)).toBe('local');
    expect(resolveViewerTranslation('es', [], true)).toBe('local');
  });

  it('has nothing to show when the language is not offered and the device cannot translate', () => {
    expect(resolveViewerTranslation('es', ['fr'], false)).toBe('none');
    expect(resolveViewerTranslation('es', [], false)).toBe('none');
  });
});

describe('coerceViewerTarget', () => {
  it('moves an ineligible viewer to the first offered language', () => {
    expect(coerceViewerTarget('es', ['fr', 'de'], false)).toBe('fr');
  });

  it('changes nothing when the language is offered, or the device can translate', () => {
    expect(coerceViewerTarget('fr', ['fr'], false)).toBeUndefined();
    expect(coerceViewerTarget('es', ['fr'], true)).toBeUndefined();
  });

  it('changes nothing when the broadcaster offers nothing', () => {
    expect(coerceViewerTarget('es', [], false)).toBeUndefined();
  });
});

describe('viewerLanguageOptions', () => {
  const codes = (list: { code: string }[]) => list.map((lang) => lang.code);

  it('lists the broadcaster\'s languages first, then the rest for a device that can translate', () => {
    const options = viewerLanguageOptions(AvailableTranslationLanguages, ['fr'], 'en-US', true);
    expect(codes(options.fromBroadcaster)).toEqual(['fr']);
    expect(options.fromBroadcaster[0].name).toBe('French (Français)');
    expect(options.local.length).toBeGreaterThan(5);
    expect(codes(options.local)).not.toContain('fr');
  });

  it('offers an ineligible viewer only what the broadcaster sends', () => {
    const options = viewerLanguageOptions(AvailableTranslationLanguages, ['fr'], 'en', false);
    expect(codes(options.fromBroadcaster)).toEqual(['fr']);
    expect(options.local).toEqual([]);
  });

  it('never offers the host\'s spoken language', () => {
    const options = viewerLanguageOptions(AvailableTranslationLanguages, ['en', 'fr'], 'en-US', true);
    expect(codes(options.fromBroadcaster)).toEqual(['fr']);
    expect(codes(options.local)).not.toContain('en');
  });

  it('lists everything locally when the broadcaster offers nothing', () => {
    const options = viewerLanguageOptions(AvailableTranslationLanguages, [], 'es', true);
    expect(options.fromBroadcaster).toEqual([]);
    expect(options.local.length).toBe(AvailableTranslationLanguages.length - 1);
  });

  it('collapses duplicate and regional offers, and names unknown codes by their code', () => {
    const options = viewerLanguageOptions(AvailableTranslationLanguages, ['fr', 'fr-CA', 'xx'], 'en', false);
    expect(options.fromBroadcaster).toEqual([
      { code: 'fr', name: 'French (Français)' },
      { code: 'xx', name: 'XX' },
    ]);
  });
});
