import { Injectable } from '@angular/core';

export type LanguageDetectorAvailability = 'unavailable' | 'downloadable' | 'downloading' | 'available';

export interface DetectedLanguage {
  detectedLanguage: string;
  confidence: number;
}

export interface BrowserLanguageDetector {
  detect(text: string): Promise<DetectedLanguage[]>;
  destroy?(): void;
}

interface LanguageDetectorStatic {
  availability(options: { expectedInputLanguages: string[] }): Promise<LanguageDetectorAvailability>;
  create(options: { expectedInputLanguages: string[] }): Promise<BrowserLanguageDetector>;
}

/**
 * Thin wrapper around the browser's built-in LanguageDetector API (Chrome 138+). Kept separate from
 * the service that uses it so the browser global can be mocked in tests.
 */
@Injectable({
  providedIn: 'root'
})
export class LanguageDetectorAdapter {

  private get api(): LanguageDetectorStatic | undefined {
    if (typeof self === 'undefined') return undefined;
    const api = (self as unknown as { LanguageDetector?: LanguageDetectorStatic }).LanguageDetector;
    if (api && typeof api.create === 'function' && typeof api.availability === 'function') {
      return api;
    }
    return undefined;
  }

  public isAvailable(): boolean {
    return this.api !== undefined;
  }

  public availability(expectedInputLanguages: string[]): Promise<LanguageDetectorAvailability> {
    const api = this.api;
    if (!api) return Promise.resolve('unavailable');
    return api.availability({ expectedInputLanguages });
  }

  public create(expectedInputLanguages: string[]): Promise<BrowserLanguageDetector> {
    const api = this.api;
    if (!api) return Promise.reject(new Error('LanguageDetector API is not available'));
    return api.create({ expectedInputLanguages });
  }
}
