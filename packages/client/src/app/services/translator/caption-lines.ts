import { CaptionSegment } from '../../models/caption-segment.model';
import { SegmentTranslation } from './segment-translations';
import { textDirection } from './text-direction';

/** One rendered caption line. `id` is the segment ID, so a line keeps its slot when its translation arrives. */
export interface CaptionLine {
  id: string;
  text: string;
  /** BCP 47 tag of the line's text; omitted when unknown (for example the broadcast viewer) */
  lang?: string;
  dir?: 'ltr' | 'rtl';
  /** The translation isn't available yet; rendered as a placeholder */
  pending?: boolean;
  /** Base language code when this line's language differs from the pane's label */
  foreignLang?: string;
}

const baseLanguage = (lang: string | undefined): string => (lang || '').split('-')[0].toLowerCase();

/** One line per segment, each with its own language and direction */
export function buildOriginalLines(segments: CaptionSegment[], paneLang: string): CaptionLine[] {
  const pane = baseLanguage(paneLang);
  return segments.map((segment) => {
    const line: CaptionLine = { id: segment.id, text: segment.text, lang: segment.lang, dir: textDirection(segment.lang) };
    const lang = baseLanguage(segment.lang);
    if (lang && pane && lang !== pane) line.foreignLang = lang;
    return line;
  });
}

/**
 * One line per segment, in segment order, so line N is the same segment in both panes. A segment
 * still awaiting translation yields a pending placeholder line.
 */
export function buildTranslatedLines(segments: CaptionSegment[],
                                     translations: Map<string, SegmentTranslation>,
                                     targetLang: string): CaptionLine[] {
  const dir = textDirection(targetLang);
  return segments.map((segment) => {
    const translation = translations.get(segment.id);
    return translation
      ? { id: segment.id, text: translation.text, lang: targetLang, dir }
      : { id: segment.id, text: '', lang: targetLang, dir, pending: true };
  });
}

/** Lines for a plain string list (broadcast viewer): no ids, languages or placeholders */
export function linesFromText(text: string[]): CaptionLine[] {
  return text.map((t) => ({ id: t, text: t }));
}
