import { CaptionSegment } from '../../models/caption-segment.model';

/**
 * Translated text for each segment, in segment order. Segments still awaiting translation are omitted.
 */
export function alignTranslations(segments: CaptionSegment[], translations: Map<string, string>): string[] {
  return segments
    .filter((segment) => translations.has(segment.id))
    .map((segment) => translations.get(segment.id) as string);
}

/**
 * Merges translation results by segment ID, dropping entries for segments no longer in the history.
 */
export function mergeTranslations(current: Map<string, string>,
                                  segments: CaptionSegment[],
                                  translatedIds: string[],
                                  translated: string[]): Map<string, string> {
  const liveIds = new Set(segments.map((segment) => segment.id));
  const next = new Map<string, string>();
  current.forEach((text, id) => {
    if (liveIds.has(id)) next.set(id, text);
  });
  translatedIds.forEach((id, idx) => {
    if (liveIds.has(id) && translated[idx] !== undefined) next.set(id, translated[idx]);
  });
  return next;
}
