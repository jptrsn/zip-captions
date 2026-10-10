import { CaptionSegment, CaptionSegmentHistory } from './caption-segment.model';

describe('CaptionSegmentHistory', () => {
  const appendMany = (history: CaptionSegmentHistory, count: number, initial: CaptionSegment[] = []) => {
    let segments = initial;
    for (let i = 0; i < count; i++) {
      segments = history.append(segments, `text ${i}`, 'en-US');
    }
    return segments;
  };

  it('caps the history at the maximum length, keeping the newest segments', () => {
    const segments = appendMany(new CaptionSegmentHistory('w', 15, 'e'), 20);
    expect(segments.length).toBe(15);
    expect(segments[0].text).toBe('text 5');
    expect(segments[14].text).toBe('text 19');
  });

  it('keeps the IDs of surviving segments stable across rollover', () => {
    const history = new CaptionSegmentHistory('w', 15, 'e');
    let segments = appendMany(history, 15);
    const idsBefore = new Map(segments.map((segment) => [segment.text, segment.id]));

    for (let i = 15; i < 30; i++) {
      segments = history.append(segments, `text ${i}`, 'en-US');
      segments.forEach((segment) => {
        if (idsBefore.has(segment.text)) {
          expect(segment.id).toBe(idsBefore.get(segment.text));
        }
      });
    }
  });

  it('never reuses an ID', () => {
    const history = new CaptionSegmentHistory('w', 15, 'e');
    const seen = new Set<string>();
    let segments: CaptionSegment[] = [];
    for (let i = 0; i < 50; i++) {
      segments = history.append(segments, `text ${i}`, 'en-US');
      const id = segments[segments.length - 1].id;
      expect(seen.has(id)).toBe(false);
      seen.add(id);
    }
  });

  it('keeps IDs from different engines apart', () => {
    const web = new CaptionSegmentHistory('w', 15, 'e').append([], 'hello', 'en-US');
    const azure = new CaptionSegmentHistory('a', 15, 'e').append([], 'hello', 'en-US');
    expect(web[0].id).not.toBe(azure[0].id);
  });

  it('produces a deterministic sequence for a given prefix and epoch', () => {
    const segments = appendMany(new CaptionSegmentHistory('a', 15, 'e'), 2);
    expect(segments.map((segment) => segment.id)).toEqual(['a-e-0', 'a-e-1']);
  });

  it('carries text, lang and start through, without mutating the input', () => {
    const start = new Date(0);
    const current: CaptionSegment[] = [];
    const next = new CaptionSegmentHistory('w', 15, 'e').append(current, 'bonjour', 'fr-CA', start);
    expect(current).toEqual([]);
    expect(next[0]).toEqual({ id: 'w-e-0', text: 'bonjour', lang: 'fr-CA', start });
  });
});
