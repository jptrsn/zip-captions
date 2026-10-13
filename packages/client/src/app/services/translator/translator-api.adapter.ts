import { Injectable } from '@angular/core';

export type TranslatorAvailability = 'unavailable' | 'downloadable' | 'downloading' | 'available';

export interface TranslatorCreateOptions {
  sourceLanguage: string;
  targetLanguage: string;
  monitor?: (monitor: EventTarget) => void;
}

export interface BrowserTranslator {
  translate(text: string): Promise<string>;
  destroy?(): void;
}

interface TranslatorStatic {
  availability(options: { sourceLanguage: string; targetLanguage: string }): Promise<TranslatorAvailability>;
  create(options: TranslatorCreateOptions): Promise<BrowserTranslator>;
}

/**
 * Thin wrapper around the browser's built-in Translator API (Chrome 138+, Edge 148+).
 * Kept separate from ChromeTranslatorService so the browser global can be mocked in tests.
 */
@Injectable({
  providedIn: 'root'
})
export class TranslatorApiAdapter {

  private get api(): TranslatorStatic | undefined {
    if (typeof self === 'undefined') return undefined;
    const api = (self as unknown as { Translator?: TranslatorStatic }).Translator;
    if (api && typeof api.create === 'function' && typeof api.availability === 'function') {
      return api;
    }
    return undefined;
  }

  public isAvailable(): boolean {
    return this.api !== undefined;
  }

  public availability(sourceLanguage: string, targetLanguage: string): Promise<TranslatorAvailability> {
    const api = this.api;
    if (!api) return Promise.resolve('unavailable');
    return api.availability({ sourceLanguage, targetLanguage });
  }

  public create(options: TranslatorCreateOptions): Promise<BrowserTranslator> {
    const api = this.api;
    if (!api) return Promise.reject(new Error('Translator API is not available'));
    return api.create(options);
  }
}
