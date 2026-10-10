import { CaptionSegment } from '../../models/caption-segment.model';
import { alignTranslations, mergeTranslations } from './segment-translations';

const segment = (id: string, text = id): CaptionSegment => ({ id, text, lang: 'en-US' });

describe('segment translations', () => {
  it('aligns translations to segments by ID, in segment order', () => {
    const segments = [segment('a'), segment('b'), segment('c')];
    const translations = new Map([['c', 'C'], ['a', 'A'], ['b', 'B']]);
    expect(alignTranslations(segments, translations)).toEqual(['A', 'B', 'C']);
  });

  it('omits segments still awaiting translation', () => {
    const segments = [segment('a'), segment('b'), segment('c')];
    expect(alignTranslations(segments, new Map([['a', 'A'], ['c', 'C']]))).toEqual(['A', 'C']);
  });

  it('attaches out-of-order results to the right segment', () => {
    const segments = [segment('a'), segment('b')];
    // The later request ('b') resolves first, then the earlier one ('a')
    let translations = mergeTranslations(new Map(), segments, ['b'], ['B']);
    translations = mergeTranslations(translations, segments, ['a'], ['A']);
    expect(alignTranslations(segments, translations)).toEqual(['A', 'B']);
  });

  it('keeps translations aligned after history rollover', () => {
    const before = [segment('a'), segment('b'), segment('c')];
    const translations = mergeTranslations(new Map(), before, ['a', 'b', 'c'], ['A', 'B', 'C']);
    const after = [segment('b'), segment('c'), segment('d')];
    const merged = mergeTranslations(translations, after, ['d'], ['D']);
    expect(alignTranslations(after, merged)).toEqual(['B', 'C', 'D']);
  });

  it('drops translations for segments that have rolled out of the history', () => {
    const translations = new Map([['a', 'A'], ['b', 'B']]);
    const merged = mergeTranslations(translations, [segment('b')], [], []);
    expect([...merged.keys()]).toEqual(['b']);
  });

  it('ignores results for segments no longer in the history', () => {
    const merged = mergeTranslations(new Map(), [segment('b')], ['a', 'b'], ['A', 'B']);
    expect([...merged.entries()]).toEqual([['b', 'B']]);
  });
});
