import { ObsFeed } from '../../modules/settings/models/settings.model';

export interface ObsCaptionInput {
  feed: ObsFeed;
  /** The live (interim) line in the spoken language */
  live: string;
  /** Strict translation of the live line, or '' while pending or after a failure */
  translatedLive: string;
  /** Translation is supported here and the display mode isn't off */
  translating: boolean;
  /** Spoken and translation language (any BCP 47 form) */
  sourceLanguage: string;
  targetLanguage: string;
}

const baseLanguage = (lang: string): string => (lang || '').split('-')[0].toLowerCase();

/**
 * The text OBS stream captions should show, or null to send nothing (the previous caption stays).
 * Untranslated text is never sent in place of a translation. The original is sent only when the
 * original feed is chosen, or when nothing is being translated (translation off, device can't).
 */
export function resolveObsCaption(input: ObsCaptionInput): string | null {
  const { feed, live, translatedLive, translating, sourceLanguage, targetLanguage } = input;
  if (feed === 'original' || !translating || !live) {
    return live;
  }
  if (baseLanguage(sourceLanguage) === baseLanguage(targetLanguage)) {
    return live;
  }
  return translatedLive ? translatedLive : null;
}

/**
 * Languages written in scripts that have no characters in the CEA-608 sets OBS stream captions use
 * (basic and special North American, extended Western European). OBS drops such characters silently.
 * Partly-Latin languages (Polish, Turkish, Vietnamese) are not listed: their coverage is unverified.
 */
const NON_CEA608_LANGUAGES: ReadonlySet<string> = new Set(['ar', 'zh', 'ja', 'ko', 'hi', 'ru', 'uk']);

export function obsCannotShowLanguage(code: string | null | undefined): boolean {
  return NON_CEA608_LANGUAGES.has(baseLanguage(code ?? ''));
}

/** The language OBS would be sent: the target when the translated feed is in effect, else the spoken language */
export function obsEffectiveLanguage(input: Pick<ObsCaptionInput, 'feed' | 'translating' | 'sourceLanguage' | 'targetLanguage'>): string {
  return input.feed === 'translated' && input.translating ? input.targetLanguage : input.sourceLanguage;
}
