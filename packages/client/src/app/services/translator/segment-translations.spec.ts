import { CaptionSegment } from '../../models/caption-segment.model';
import { SegmentTranslation, alignTranslations, mergeTranslations, planTranslations } from './segment-translations';

const segment = (id: string, lang = 'en-US', text = id): CaptionSegment => ({ id, text, lang });
const translation = (text: string, lang = 'en-US'): SegmentTranslation => ({ lang, text });

describe('segment translations', () => {
  it('aligns translations to segments by ID, in segment order', () => {
    const segments = [segment('a'), segment('b'), segment('c')];
    const translations = new Map([['c', translation('C')], ['a', translation('A')], ['b', translation('B')]]);
    expect(alignTranslations(segments, translations)).toEqual(['A', 'B', 'C']);
  });

  it('omits segments still awaiting translation', () => {
    const segments = [segment('a'), segment('b'), segment('c')];
    expect(alignTranslations(segments, new Map([['a', translation('A')], ['c', translation('C')]]))).toEqual(['A', 'C']);
  });

  it('attaches out-of-order results to the right segment', () => {
    const segments = [segment('a'), segment('b')];
    // The later request ('b') resolves first, then the earlier one ('a')
    let translations = mergeTranslations(new Map(), segments, [segments[1]], ['B']);
    translations = mergeTranslations(translations, segments, [segments[0]], ['A']);
    expect(alignTranslations(segments, translations)).toEqual(['A', 'B']);
  });

  it('keeps translations aligned after history rollover', () => {
    const before = [segment('a'), segment('b'), segment('c')];
    const translations = mergeTranslations(new Map(), before, before, ['A', 'B', 'C']);
    const after = [segment('b'), segment('c'), segment('d')];
    const merged = mergeTranslations(translations, after, [after[2]], ['D']);
    expect(alignTranslations(after, merged)).toEqual(['B', 'C', 'D']);
  });

  it('drops translations for segments that have rolled out of the history', () => {
    const translations = new Map([['a', translation('A')], ['b', translation('B')]]);
    const merged = mergeTranslations(translations, [segment('b')], [], []);
    expect([...merged.keys()]).toEqual(['b']);
  });

  it('records the language each segment was translated from', () => {
    const fr = segment('a', 'fr-CA');
    const merged = mergeTranslations(new Map(), [fr], [fr], ['A']);
    expect(merged.get('a')).toEqual({ lang: 'fr-CA', text: 'A' });
  });

  describe('planTranslations', () => {
    it('groups segments by their own language', () => {
      const segments = [segment('a', 'fr-CA'), segment('b', 'en-US'), segment('c', 'fr-FR')];
      const groups = planTranslations(segments, new Map(), 'es');
      expect(groups.map((group) => [group.sourceLang, group.segments.map((s) => s.id)])).toEqual([
        ['fr', ['a', 'c']],
        ['en', ['b']],
      ]);
      expect(groups.every((group) => !group.passThrough)).toBe(true);
    });

    it('passes through segments already in the target language', () => {
      // After a swap to en->fr, earlier French lines are already in the target language
      const segments = [segment('a', 'fr-CA'), segment('b', 'en-US')];
      const groups = planTranslations(segments, new Map(), 'fr');
      expect(groups.find((group) => group.sourceLang === 'fr')?.passThrough).toBe(true);
      expect(groups.find((group) => group.sourceLang === 'en')?.passThrough).toBe(false);
    });

    it('skips segments that are translated or in flight', () => {
      const segments = [segment('a'), segment('b'), segment('c')];
      const groups = planTranslations(segments, new Map([['a', translation('A')]]), 'fr', new Set(['b']));
      expect(groups.flatMap((group) => group.segments.map((s) => s.id))).toEqual(['c']);
    });

    it('retranslates a segment whose language changed', () => {
      const segments = [segment('a', 'fr-CA')];
      const groups = planTranslations(segments, new Map([['a', translation('A', 'en-US')]]), 'es');
      expect(groups.map((group) => group.sourceLang)).toEqual(['fr']);
    });
  });
});
