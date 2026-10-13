import { CaptionSegment } from '../../../models/caption-segment.model';
import { SegmentTranslation } from '../../../services/translator/segment-translations';
import { buildLivePayload, buildSegmentPayload, buildTranslatedWire, parseLivePayload, parseSegmentPayload, synthesizeSegments } from './broadcast-payload';

const seg = (id: string, text: string, lang = 'en-US'): CaptionSegment => ({ id, text, lang });

describe('broadcast payload', () => {
  const segments = [seg('a', 'one'), seg('b', 'two'), seg('c', 'three')];

  describe('buildSegmentPayload', () => {
    it('keeps the version 1 fields that older viewers read', () => {
      const payload = buildSegmentPayload(segments, 'en-US', ['fr'], []);
      expect(payload.type).toBe('segment');
      expect(payload.recognition).toEqual(['one', 'two', 'three']);
      expect(payload.lang).toBe('en-US');
    });

    it('adds segments with IDs and languages, the offered languages and the translations', () => {
      const translations = new Map<string, SegmentTranslation>([['a', { lang: 'en-US', text: 'un' }]]);
      const payload = buildSegmentPayload(segments, 'en-US', ['fr'], buildTranslatedWire(segments, translations, 'fr'));
      expect(payload.v).toBe(2);
      expect(payload.segments).toEqual([
        { id: 'a', text: 'one', lang: 'en-US' },
        { id: 'b', text: 'two', lang: 'en-US' },
        { id: 'c', text: 'three', lang: 'en-US' },
      ]);
      expect(payload.translations).toEqual(['fr']);
      expect(payload.translated).toEqual([{ id: 'a', text: 'un', lang: 'fr' }]);
    });

    it('offers nothing when the broadcaster is not translating', () => {
      const payload = buildSegmentPayload(segments, 'en-US');
      expect(payload.translations).toEqual([]);
      expect(payload.translated).toEqual([]);
    });

    it('does not carry the start time or other segment fields', () => {
      const payload = buildSegmentPayload([{ ...seg('a', 'one'), start: new Date() }], 'en-US');
      expect(Object.keys(payload.segments![0]).sort()).toEqual(['id', 'lang', 'text']);
    });
  });

  describe('buildTranslatedWire', () => {
    it('leaves out pending segments, and keeps segment order', () => {
      const translations = new Map<string, SegmentTranslation>([
        ['c', { lang: 'en-US', text: 'trois' }],
        ['a', { lang: 'en-US', text: 'un' }],
      ]);
      expect(buildTranslatedWire(segments, translations, 'fr').map((s) => s.id)).toEqual(['a', 'c']);
    });

    it('includes a pass-through translation (text unchanged)', () => {
      const wire = buildTranslatedWire([seg('x', 'bonjour', 'fr-CA')], new Map([['x', { lang: 'fr-CA', text: 'bonjour' }]]), 'fr');
      expect(wire).toEqual([{ id: 'x', text: 'bonjour', lang: 'fr' }]);
    });
  });

  describe('buildLivePayload', () => {
    it('keeps the version 1 fields and adds the translated line only when there is one', () => {
      const without = buildLivePayload('hello', 'en-US');
      expect(without).toMatchObject({ type: 'live', recognition: 'hello', lang: 'en-US' });
      expect('translatedLive' in without).toBe(false);
      expect(buildLivePayload('hello', 'en-US', ['fr'], 'bonjour')).toMatchObject({ translations: ['fr'], translatedLive: 'bonjour' });
    });

    it('never sends a translated line without the live line it translates', () => {
      expect('translatedLive' in buildLivePayload('', 'en-US', ['fr'], 'bonjour')).toBe(false);
    });
  });

  describe('parseSegmentPayload', () => {
    it('reads a version 2 message exactly', () => {
      const payload = buildSegmentPayload(segments, 'en-US', ['fr'], [{ id: 'a', text: 'un', lang: 'fr' }]);
      const parsed = parseSegmentPayload(payload, 'zz');
      expect(parsed.segments.map((s) => s.id)).toEqual(['a', 'b', 'c']);
      expect(parsed.offered).toEqual(['fr']);
      expect(parsed.translated).toEqual([{ id: 'a', text: 'un', lang: 'fr' }]);
    });

    it('reads a version 1 message into segments in the host language, offering no translations', () => {
      const parsed = parseSegmentPayload({ type: 'segment', recognition: ['hello', 'world'], lang: 'fr-CA' }, 'en');
      expect(parsed.segments).toEqual([
        { id: 'hello#0', text: 'hello', lang: 'fr-CA' },
        { id: 'world#0', text: 'world', lang: 'fr-CA' },
      ]);
      expect(parsed.offered).toEqual([]);
      expect(parsed.translated).toEqual([]);
    });

    it('falls back to the known host language when the message has none', () => {
      expect(parseSegmentPayload({ recognition: ['hi'] }, 'es-MX').segments[0].lang).toBe('es-MX');
    });

    it('ignores malformed entries and tolerates missing fields', () => {
      const parsed = parseSegmentPayload({ v: 2, recognition: ['a'], segments: [{ id: 'a', text: 'a', lang: 'en' }, { text: 'no id' }, null], translations: ['fr', 3, ''], translated: 'nope' }, 'en');
      expect(parsed.segments.map((s) => s.id)).toEqual(['a']);
      expect(parsed.offered).toEqual(['fr']);
      expect(parsed.translated).toEqual([]);
      expect(parseSegmentPayload({}, 'en')).toEqual({ segments: [], offered: [], translated: [] });
    });

    it('treats a version 2 message without segments as a version 1 message', () => {
      expect(parseSegmentPayload({ v: 2, recognition: ['a'], lang: 'en' }, 'en').segments.map((s) => s.text)).toEqual(['a']);
    });
  });

  describe('parseLivePayload', () => {
    it('reads live text from both versions', () => {
      expect(parseLivePayload({ type: 'live', recognition: 'hi', lang: 'en' })).toEqual({ live: 'hi', offered: [], translatedLive: '' });
      expect(parseLivePayload(buildLivePayload('hi', 'en', ['fr'], 'salut'))).toEqual({ live: 'hi', offered: ['fr'], translatedLive: 'salut' });
    });
  });

  describe('synthesizeSegments', () => {
    it('keeps IDs stable when the oldest segment rolls out of the snapshot', () => {
      const before = synthesizeSegments(['a', 'b', 'c'], 'en');
      const after = synthesizeSegments(['b', 'c', 'd'], 'en');
      expect(after.slice(0, 2).map((s) => s.id)).toEqual(before.slice(1).map((s) => s.id));
    });

    it('gives repeated identical text distinct IDs', () => {
      const ids = synthesizeSegments(['yes', 'yes', 'no', 'yes'], 'en').map((s) => s.id);
      expect(new Set(ids).size).toBe(4);
    });
  });
});
