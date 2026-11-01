const RTL_LANGUAGES = new Set(['ar', 'fa', 'he', 'ur']);

/**
 * Returns the writing direction for a BCP 47 language tag (e.g. 'ar-SA' -> 'rtl').
 */
export function textDirection(lang: string | undefined): 'ltr' | 'rtl' {
  const base = (lang || '').split('-')[0].toLowerCase();
  return RTL_LANGUAGES.has(base) ? 'rtl' : 'ltr';
}
