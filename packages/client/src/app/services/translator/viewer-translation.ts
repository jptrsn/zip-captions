import { SupportedTranslationLanguage } from '../../modules/settings/models/settings.model';

/** Where a broadcast viewer's translated text comes from */
export type ViewerTranslationSource = 'broadcaster' | 'local' | 'none';

const baseLanguage = (lang: string | undefined): string => (lang || '').split('-')[0].toLowerCase();

/**
 * Decides where a viewer gets the language they chose (FR-B5). The broadcaster's translation is always
 * preferred when it exists, so the same text is never translated twice. Otherwise the viewer's own
 * device translates, if it can. Otherwise there is nothing to show.
 */
export function resolveViewerTranslation(target: string, offered: string[], canTranslateLocally: boolean): ViewerTranslationSource {
  const wanted = baseLanguage(target);
  if (wanted && offered.some((lang) => baseLanguage(lang) === wanted)) return 'broadcaster';
  return canTranslateLocally ? 'local' : 'none';
}

/**
 * A language an ineligible viewer should use instead of one the broadcaster doesn't offer: the first
 * offered language. Undefined when nothing needs to change, or when nothing is offered.
 */
export function coerceViewerTarget(target: string, offered: string[], canTranslateLocally: boolean): string | undefined {
  if (resolveViewerTranslation(target, offered, canTranslateLocally) !== 'none') return undefined;
  return offered.length ? baseLanguage(offered[0]) : undefined;
}

export interface ViewerLanguageOptions {
  /** Languages the broadcaster translates into: listed first and marked as coming from the broadcaster */
  fromBroadcaster: SupportedTranslationLanguage[];
  /** Other languages this device can translate into; empty when the device can't translate */
  local: SupportedTranslationLanguage[];
}

/** The language picker for a viewer (FR-B4). The host's spoken language is never offered as a target. */
export function viewerLanguageOptions(all: SupportedTranslationLanguage[],
                                      offered: string[],
                                      sourceLang: string,
                                      canTranslateLocally: boolean): ViewerLanguageOptions {
  const source = baseLanguage(sourceLang);
  const offeredCodes = offered.map(baseLanguage).filter((code, index, list) => !!code && code !== source && list.indexOf(code) === index);
  const fromBroadcaster = offeredCodes.map((code) => all.find((lang) => lang.code === code) ?? { code, name: code.toUpperCase() });
  const local = canTranslateLocally
    ? all.filter((lang) => lang.code !== source && !offeredCodes.includes(lang.code))
    : [];
  return { fromBroadcaster, local };
}
