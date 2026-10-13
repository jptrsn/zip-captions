import { CaptionSegment } from '../../models/caption-segment.model';
import { SegmentTranslationSession, TranslateFn } from './segment-translation-session';

const seg = (id: string, text: string, lang = 'en-US'): CaptionSegment => ({ id, text, lang });
const flush = () => new Promise((resolve) => setTimeout(resolve, 0));

interface Deferred { texts: string[]; source: string; target: string; resolve: (v: (string | null)[]) => void; reject: (e: unknown) => void }

/** A translate function whose results the test resolves by hand */
const manual = () => {
  const calls: Deferred[] = [];
  const fn: TranslateFn = (texts, source, target) => new Promise((resolve, reject) => calls.push({ texts, source, target, resolve, reject }));
  return { fn, calls };
};

const instant: TranslateFn = (texts, _source, target) => Promise.resolve(texts.map((t) => `${target}:${t}`));

describe('SegmentTranslationSession', () => {
  it('translates segments into the target and keys them by ID', async () => {
    const session = new SegmentTranslationSession(instant);
    session.update([seg('a', 'one'), seg('b', 'two')], 'fr');
    await flush();
    expect([...session.translations().entries()].map(([id, t]) => [id, t.text])).toEqual([['a', 'fr:one'], ['b', 'fr:two']]);
  });

  it('puts an out-of-order result on the right segment', async () => {
    const { fn, calls } = manual();
    const session = new SegmentTranslationSession(fn);
    const segments = [seg('a', 'one'), seg('b', 'two')];
    session.update(segments.slice(0, 1), 'fr');
    session.update(segments, 'fr');
    expect(calls.map((c) => c.texts)).toEqual([['one'], ['two']]);

    calls[1].resolve(['deux']);
    await flush();
    expect(session.translations().get('b')?.text).toBe('deux');
    expect(session.translations().has('a')).toBe(false);
    calls[0].resolve(['un']);
    await flush();
    expect(session.translations().get('a')?.text).toBe('un');
  });

  it('does not translate a segment twice while its translation is in flight', () => {
    const { fn, calls } = manual();
    const session = new SegmentTranslationSession(fn);
    session.update([seg('a', 'one')], 'fr');
    session.update([seg('a', 'one')], 'fr');
    expect(calls.length).toBe(1);
  });

  it('leaves a segment pending when its translation fails (null), and retries it on the next update', async () => {
    const results: (string | null)[][] = [[null, 'deux'], ['un']];
    const fn: TranslateFn = jest.fn(() => Promise.resolve(results.shift() as (string | null)[]));
    const session = new SegmentTranslationSession(fn);
    const segments = [seg('a', 'one'), seg('b', 'two')];
    session.update(segments, 'fr');
    await flush();
    expect(session.translations().has('a')).toBe(false);
    expect(session.translations().get('b')?.text).toBe('deux');

    session.update(segments, 'fr');
    await flush();
    expect(fn).toHaveBeenLastCalledWith(['one'], 'en', 'fr');
    expect(session.translations().get('a')?.text).toBe('un');
  });

  it('leaves a segment pending when the translate function rejects', async () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    const session = new SegmentTranslationSession(() => Promise.reject(new Error('boom')));
    session.update([seg('a', 'one')], 'fr');
    await flush();
    expect(session.translations().size).toBe(0);
    warn.mockRestore();
  });

  it('passes a segment already in the target language through without calling the translator', async () => {
    const fn = jest.fn(instant);
    const session = new SegmentTranslationSession(fn);
    session.update([seg('a', 'bonjour', 'fr-CA'), seg('b', 'hello')], 'fr');
    await flush();
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(['hello'], 'en', 'fr');
    expect(session.translations().get('a')?.text).toBe('bonjour');
  });

  it('translates each segment from its own language', async () => {
    const fn = jest.fn(instant);
    const session = new SegmentTranslationSession(fn);
    session.update([seg('a', 'hello', 'en-US'), seg('b', 'hola', 'es-MX'), seg('c', 'bye', 'en-GB')], 'fr');
    await flush();
    expect(fn).toHaveBeenCalledWith(['hello', 'bye'], 'en', 'fr');
    expect(fn).toHaveBeenCalledWith(['hola'], 'es', 'fr');
  });

  it('discards results that were in flight when the target changed', async () => {
    const { fn, calls } = manual();
    const session = new SegmentTranslationSession(fn);
    session.update([seg('a', 'one')], 'fr');
    session.update([seg('a', 'one')], 'es', true);
    expect(calls.map((c) => c.target)).toEqual(['fr', 'es']);

    calls[0].resolve(['un']);
    await flush();
    expect(session.translations().has('a')).toBe(false);
    calls[1].resolve(['uno']);
    await flush();
    expect(session.translations().get('a')?.text).toBe('uno');
  });

  it('keeps showing the previous target\'s translations until the new ones land', async () => {
    const { fn, calls } = manual();
    const session = new SegmentTranslationSession(fn);
    session.update([seg('a', 'one')], 'fr');
    calls[0].resolve(['un']);
    await flush();

    session.update([seg('a', 'one')], 'es', true);
    expect(session.translations().get('a')?.text).toBe('un');
    calls[1].resolve(['uno']);
    await flush();
    expect(session.translations().get('a')?.text).toBe('uno');
  });

  it('drops translations of segments that rolled out of the history', async () => {
    const session = new SegmentTranslationSession(instant);
    session.update([seg('a', 'one'), seg('b', 'two')], 'fr');
    await flush();
    session.update([seg('b', 'two'), seg('c', 'three')], 'fr');
    await flush();
    expect([...session.translations().keys()].sort()).toEqual(['b', 'c']);
  });

  it('retranslates a segment whose language changed', async () => {
    const fn = jest.fn(instant);
    const session = new SegmentTranslationSession(fn);
    session.update([seg('a', 'hello', 'en-US')], 'fr');
    await flush();
    session.update([seg('a', 'hello', 'es-MX')], 'fr');
    await flush();
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenLastCalledWith(['hello'], 'es', 'fr');
  });

  it('reset forgets everything, including what was shown while waiting', async () => {
    const session = new SegmentTranslationSession(instant);
    session.update([seg('a', 'one')], 'fr');
    await flush();
    session.reset();
    expect(session.translations().size).toBe(0);
  });
});
