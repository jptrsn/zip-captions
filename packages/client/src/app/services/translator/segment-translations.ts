import { CaptionSegment } from '../../models/caption-segment.model';

/** A segment's translation, with the source language it was translated from */
export interface SegmentTranslation {
  lang: string;
  text: string;
}

/** Segments to translate from one source language */
export interface TranslationGroup {
  sourceLang: string;
  segments: CaptionSegment[];
  /** Source already matches the target: show the text as spoken */
  passThrough: boolean;
}

const baseLanguage = (lang: string): string => (lang || 'en').split('-')[0].toLowerCase();

/**
 * Translated text for each segment, in segment order. Segments still awaiting translation are omitted.
 */
export function alignTranslations(segments: CaptionSegment[], translations: Map<string, SegmentTranslation>): string[] {
  return segments
    .filter((segment) => translations.has(segment.id))
    .map((segment) => (translations.get(segment.id) as SegmentTranslation).text);
}

/**
 * Groups segments that need translation by their own source language. A segment needs translation
 * when it has none yet, or its language changed since it was translated.
 */
export function planTranslations(segments: CaptionSegment[],
                                 translations: Map<string, SegmentTranslation>,
                                 targetLang: string,
                                 inFlight: ReadonlySet<string> = new Set()): TranslationGroup[] {
  const groups = new Map<string, TranslationGroup>();
  const target = baseLanguage(targetLang);
  segments.forEach((segment) => {
    const existing = translations.get(segment.id);
    if (inFlight.has(segment.id) || (existing && existing.lang === segment.lang)) return;
    const sourceLang = baseLanguage(segment.lang);
    const group = groups.get(sourceLang) ?? { sourceLang, segments: [], passThrough: sourceLang === target };
    group.segments.push(segment);
    groups.set(sourceLang, group);
  });
  return [...groups.values()];
}

/**
 * Merges translation results by segment ID, dropping entries for segments no longer in the history.
 */
export function mergeTranslations(current: Map<string, SegmentTranslation>,
                                  segments: CaptionSegment[],
                                  translated: CaptionSegment[],
                                  texts: string[]): Map<string, SegmentTranslation> {
  const liveIds = new Set(segments.map((segment) => segment.id));
  const next = new Map<string, SegmentTranslation>();
  current.forEach((translation, id) => {
    if (liveIds.has(id)) next.set(id, translation);
  });
  translated.forEach((segment, idx) => {
    if (liveIds.has(segment.id) && texts[idx] !== undefined) next.set(segment.id, { lang: segment.lang, text: texts[idx] });
  });
  return next;
}
