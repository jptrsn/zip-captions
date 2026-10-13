import { CaptionSegment } from '../../../models/caption-segment.model';
import { SegmentTranslation } from '../../../services/translator/segment-translations';

/** Version of the broadcast payload. Viewers that predate it read only `recognition` and `lang`. */
export const BROADCAST_PAYLOAD_VERSION = 2;

/** A caption segment as sent to viewers */
export interface WireSegment {
  id: string;
  text: string;
  /** BCP 47 tag of the text */
  lang: string;
}

/**
 * Snapshot of the most recent final segments. `recognition` and `lang` are the original (v1) fields,
 * kept so older viewers work unchanged; everything else is additive.
 */
export interface SegmentPayload {
  type: 'segment';
  recognition: string[];
  lang: string;
  v?: number;
  segments?: WireSegment[];
  /** Languages the broadcaster translates into */
  translations?: string[];
  /** Translations that exist so far: same IDs as `segments`, `lang` is the translation language */
  translated?: WireSegment[];
}

export interface LivePayload {
  type: 'live';
  recognition: string;
  lang: string;
  v?: number;
  translations?: string[];
  translatedLive?: string;
}

/** What a viewer reads from a segment message */
export interface ParsedSegmentPayload {
  segments: WireSegment[];
  offered: string[];
  translated: WireSegment[];
}

/** What a viewer reads from a live message */
export interface ParsedLivePayload {
  live: string;
  offered: string[];
  translatedLive: string;
}

/** The translations that exist, as wire segments in segment order. Pending ones are left out. */
export function buildTranslatedWire(segments: CaptionSegment[],
                                    translations: Map<string, SegmentTranslation>,
                                    targetLang: string): WireSegment[] {
  const wire: WireSegment[] = [];
  segments.forEach((segment) => {
    const translation = translations.get(segment.id);
    if (translation) wire.push({ id: segment.id, text: translation.text, lang: targetLang });
  });
  return wire;
}

export function buildSegmentPayload(segments: CaptionSegment[],
                                    hostLang: string,
                                    offered: string[] = [],
                                    translated: WireSegment[] = []): SegmentPayload {
  return {
    type: 'segment',
    recognition: segments.map((segment) => segment.text),
    lang: hostLang,
    v: BROADCAST_PAYLOAD_VERSION,
    segments: segments.map(({ id, text, lang }) => ({ id, text, lang })),
    translations: offered,
    translated,
  };
}

export function buildLivePayload(live: string, hostLang: string, offered: string[] = [], translatedLive = ''): LivePayload {
  const payload: LivePayload = { type: 'live', recognition: live, lang: hostLang, v: BROADCAST_PAYLOAD_VERSION, translations: offered };
  if (translatedLive) payload.translatedLive = translatedLive;
  return payload;
}

/**
 * Segments for a broadcaster that predates segment IDs. An ID is the text plus a count of earlier
 * identical texts, so it stays the same when the oldest segment rolls out of the snapshot.
 */
export function synthesizeSegments(texts: string[], lang: string): WireSegment[] {
  const seen = new Map<string, number>();
  return texts.map((text) => {
    const count = seen.get(text) ?? 0;
    seen.set(text, count + 1);
    return { id: `${text}#${count}`, text, lang };
  });
}

const isWireSegment = (value: any): value is WireSegment =>
  !!value && typeof value.id === 'string' && typeof value.text === 'string';

const stringList = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter((v): v is string => typeof v === 'string' && v !== '') : [];

/** Reads a segment message from either version of the broadcaster */
export function parseSegmentPayload(data: any, hostLang: string): ParsedSegmentPayload {
  const lang = (typeof data?.lang === 'string' && data.lang) || hostLang;
  const recognition: string[] = Array.isArray(data?.recognition) ? data.recognition : [];
  if (data?.v >= 2 && Array.isArray(data.segments)) {
    return {
      segments: data.segments.filter(isWireSegment).map((segment: WireSegment) => ({ ...segment, lang: segment.lang || lang })),
      offered: stringList(data.translations),
      translated: Array.isArray(data.translated) ? data.translated.filter(isWireSegment) : [],
    };
  }
  return { segments: synthesizeSegments(recognition, lang), offered: [], translated: [] };
}

/** Reads a live message from either version of the broadcaster */
export function parseLivePayload(data: any): ParsedLivePayload {
  const v2 = data?.v >= 2;
  return {
    live: typeof data?.recognition === 'string' ? data.recognition : '',
    offered: v2 ? stringList(data.translations) : [],
    translatedLive: v2 && typeof data.translatedLive === 'string' ? data.translatedLive : '',
  };
}
