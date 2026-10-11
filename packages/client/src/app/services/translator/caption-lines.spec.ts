import { CaptionSegment } from '../../models/caption-segment.model';
import { buildOriginalLines, buildTranslatedLines, linesFromText } from './caption-lines';
import { SegmentTranslation } from './segment-translations';

const seg = (id: string, text: string, lang = 'en-US'): CaptionSegment => ({ id, text, lang });

describe('caption lines', () => {
  const segments = [seg('a', 'one'), seg('b', 'two'), seg('c', 'three'), seg('d', 'four'), seg('e', 'five')];

  describe('buildTranslatedLines', () => {
    it('has one line per segment, with a placeholder for each pending translation', () => {
      const translations = new Map<string, SegmentTranslation>([
        ['a', { lang: 'en-US', text: 'uno' }],
        ['d', { lang: 'en-US', text: 'cuatro' }],
      ]);
      const lines = buildTranslatedLines(segments, translations, 'es');
      expect(lines.map((l) => l.id)).toEqual(['a', 'b', 'c', 'd', 'e']);
      expect(lines.map((l) => !!l.pending)).toEqual([false, true, true, false, true]);
      expect(lines[0].text).toBe('uno');
      expect(lines[1].text).toBe('');
    });

    it('fills the same slot when a translation arrives later', () => {
      const before = buildTranslatedLines(segments, new Map([['a', { lang: 'en-US', text: 'uno' }]]), 'es');
      const after = buildTranslatedLines(segments, new Map([
        ['a', { lang: 'en-US', text: 'uno' }],
        ['c', { lang: 'en-US', text: 'tres' }],
      ]), 'es');
      expect(after.map((l) => l.id)).toEqual(before.map((l) => l.id));
      expect(before[2].pending).toBe(true);
      expect(after[2]).toMatchObject({ id: 'c', text: 'tres' });
      expect(after[2].pending).toBeUndefined();
    });

    it('matches the original lines one to one, so a history slice picks the same segments in both panes', () => {
      const original = buildOriginalLines(segments, 'en-US');
      const translated = buildTranslatedLines(segments, new Map([['e', { lang: 'en-US', text: 'cinco' }]]), 'es');
      expect(translated.length).toBe(original.length);
      expect(translated.slice(-3).map((l) => l.id)).toEqual(original.slice(-3).map((l) => l.id));
    });

    it('drops translations of segments that rolled out of the history', () => {
      const lines = buildTranslatedLines(segments.slice(2), new Map([
        ['a', { lang: 'en-US', text: 'uno' }],
        ['c', { lang: 'en-US', text: 'tres' }],
      ]), 'es');
      expect(lines.map((l) => l.id)).toEqual(['c', 'd', 'e']);
    });

    it('marks every line, placeholders included, with the target language and direction', () => {
      const arabic = buildTranslatedLines(segments.slice(0, 2), new Map([['a', { lang: 'en-US', text: 'واحد' }]]), 'ar');
      expect(arabic.every((l) => l.lang === 'ar' && l.dir === 'rtl')).toBe(true);
      const french = buildTranslatedLines(segments.slice(0, 1), new Map(), 'fr');
      expect(french[0]).toMatchObject({ lang: 'fr', dir: 'ltr', pending: true });
    });

    it('treats a pass-through translation (same text, target language) as available', () => {
      const lines = buildTranslatedLines([seg('x', 'bonjour', 'fr-CA')], new Map([['x', { lang: 'fr-CA', text: 'bonjour' }]]), 'fr');
      expect(lines[0].pending).toBeUndefined();
      expect(lines[0].text).toBe('bonjour');
    });
  });

  describe('buildOriginalLines', () => {
    it('renders an English line left to right inside an Arabic-spoken pane', () => {
      const lines = buildOriginalLines([seg('1', 'مرحبا', 'ar-SA'), seg('2', 'hello there', 'en-US')], 'ar-SA');
      expect(lines[0]).toMatchObject({ lang: 'ar-SA', dir: 'rtl' });
      expect(lines[1]).toMatchObject({ lang: 'en-US', dir: 'ltr' });
    });

    it('uses each segment\'s own language, not the pane\'s', () => {
      const lines = buildOriginalLines([seg('1', 'bonjour', 'fr-CA'), seg('2', 'hello', 'en-US')], 'fr-CA');
      expect(lines.map((l) => l.lang)).toEqual(['fr-CA', 'en-US']);
    });

    it('flags only lines whose base language differs from the pane label', () => {
      const lines = buildOriginalLines([
        seg('1', 'bonjour', 'fr-CA'),
        seg('2', 'salut', 'fr'),
        seg('3', 'hello', 'en-US'),
      ], 'fr-FR');
      expect(lines.map((l) => l.foreignLang)).toEqual([undefined, undefined, 'en']);
    });

    it('marks older lines after a language swap', () => {
      const lines = buildOriginalLines([seg('old', 'bonjour', 'fr-CA'), seg('new', 'hello', 'en-US')], 'en-US');
      expect(lines.map((l) => l.foreignLang)).toEqual(['fr', undefined]);
    });
  });

  describe('linesFromText', () => {
    it('builds plain lines without languages or placeholders', () => {
      const lines = linesFromText(['hello', 'world']);
      expect(lines.map((l) => l.text)).toEqual(['hello', 'world']);
      expect(lines.every((l) => l.lang === undefined && l.dir === undefined && !l.pending)).toBe(true);
    });
  });
});
