import { Injectable } from '@angular/core';
import { BrowserLanguageDetector, DetectedLanguage, LanguageDetectorAdapter } from './language-detector.adapter';

/** Below this confidence the result is not trusted */
export const MIN_LANGUAGE_CONFIDENCE = 0.5;
/** Two languages scoring this close are a tie */
export const LANGUAGE_TIE_MARGIN = 0.1;
/** Text shorter than this (letters only) says too little to tell the language ("oui", "ok") */
export const MIN_DETECTABLE_LETTERS = 6;

const baseLanguage = (lang: string): string => lang.split('-')[0].toLowerCase();

/**
 * The language a recognized segment was spoken in, out of the two a bilingual model recognizes. Only the
 * pair is considered: whatever else the detector thinks the text is, it is scored for these two.
 * A text that is too short, a score that is too low, or a tie takes the previous segment's language
 * (the first segment of a session, which has none, takes the pair's first language).
 */
export function resolveSegmentLanguage(text: string,
                                       results: DetectedLanguage[],
                                       pair: readonly string[],
                                       previous?: string): string {
  const fallback = previous ?? pair[0];
  if (text.replace(/[^\p{L}]/gu, '').length < MIN_DETECTABLE_LETTERS) return fallback;
  const scores = pair.map((lang) => ({
    lang,
    confidence: results.filter((r) => baseLanguage(r.detectedLanguage) === lang).reduce((best, r) => Math.max(best, r.confidence), 0)
  })).sort((a, b) => b.confidence - a.confidence);
  const [best, second] = scores;
  if (!best || best.confidence < MIN_LANGUAGE_CONFIDENCE) return fallback;
  if (second && best.confidence - second.confidence < LANGUAGE_TIE_MARGIN) return fallback;
  return best.lang;
}

export type SegmentLanguageStatus = 'unsupported' | 'ready' | 'unavailable';

/**
 * Tells which of a bilingual model's two languages a final segment was spoken in, on this device,
 * from the recognized text (Azure does not report it for these models). Chrome's LanguageDetector
 * may have to download a small model; only `create()` downloads, so it is asked for when recognition
 * starts, which follows the user's click. Where the detector cannot be had, nothing is detected and
 * the caller keeps the configured language.
 */
@Injectable({
  providedIn: 'root'
})
export class SegmentLanguageService {
  private detector?: BrowserLanguageDetector;
  private detectorKey = '';
  private pending?: Promise<boolean>;

  constructor(private adapter: LanguageDetectorAdapter) {}

  public isSupported(): boolean {
    return this.adapter.isAvailable();
  }

  /** Gets a detector for the pair, downloading its model if needed. Resolves false when it cannot be had. */
  public prepare(pair: readonly string[]): Promise<boolean> {
    const key = pair.join('|');
    if (this.detector && this.detectorKey === key) return Promise.resolve(true);
    if (this.pending && this.detectorKey === key) return this.pending;
    if (!this.adapter.isAvailable()) return Promise.resolve(false);
    this.detectorKey = key;
    this.detector = undefined;
    const attempt: Promise<boolean> = this.createDetector(key, pair).finally(() => {
      if (this.pending === attempt) this.pending = undefined;
    });
    this.pending = attempt;
    return attempt;
  }

  private async createDetector(key: string, pair: readonly string[]): Promise<boolean> {
    try {
      const availability = await this.adapter.availability([...pair]);
      if (availability === 'unavailable') return false;
      const detector = await this.adapter.create([...pair]);
      if (this.detectorKey !== key) return false;
      this.detector = detector;
      return true;
    } catch (err) {
      console.warn('Language detection is not available:', err);
      return false;
    }
  }

  /** The language of `text`, or `fallback` when no detector is ready or detection fails */
  public async detect(text: string, pair: readonly string[], previous: string | undefined, fallback: string): Promise<string> {
    if (!this.detector || this.detectorKey !== pair.join('|')) return fallback;
    try {
      return resolveSegmentLanguage(text, await this.detector.detect(text), pair, previous);
    } catch (err) {
      console.warn('Language detection failed:', err);
      return fallback;
    }
  }

  public destroy(): void {
    this.detector?.destroy?.();
    this.detector = undefined;
    this.detectorKey = '';
    this.pending = undefined;
  }
}
