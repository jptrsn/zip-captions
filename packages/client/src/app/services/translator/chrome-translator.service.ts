import { Platform } from '@angular/cdk/platform';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable, Subject, from, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { BrowserTranslator, TranslatorApiAdapter, TranslatorCreateOptions } from './translator-api.adapter';

export type TranslationUnsupportedReason = 'mobile' | 'browser';

export type TranslationModelStatus = 'ready' | 'downloadable' | 'downloading' | 'unavailable' | 'error';

export interface TranslationCapability {
  available: boolean;
  status: 'readily' | 'after-download' | 'no';
}

@Injectable({
  providedIn: 'root'
})
export class ChromeTranslatorService {

  public modelStatus: WritableSignal<TranslationModelStatus> = signal('unavailable');
  public downloadProgress: WritableSignal<number> = signal(0);
  public lastError: WritableSignal<string | undefined> = signal(undefined);

  // Emits when a model becomes ready to trigger re-translation of active captions
  private modelReadySubject = new Subject<{ sourceLang: string; targetLang: string }>();
  public modelReady$: Observable<{ sourceLang: string; targetLang: string }> = this.modelReadySubject.asObservable();

  // One live translator per language pair; Map insertion order is least-recently-used first
  private translators: Map<string, BrowserTranslator> = new Map();
  private readonly MAX_TRANSLATORS = 4;

  // Prevent duplicate concurrent initialization requests to Chrome, per pair
  private pendingInits: Map<string, { promise: Promise<BrowserTranslator | null>; userInitiated: boolean }> = new Map();

  // Track language pairs that Chrome explicitly reported as unsupported
  private unsupportedPairs: Set<string> = new Set();

  // Translated segments for the current recognition session only; cleared by clearSessionCache()
  private segmentCache: Map<string, string> = new Map();
  private readonly MAX_CACHED_SEGMENTS = 500;

  // Subject for live caption streaming with debounce
  private liveInputSubject = new Subject<{ text: string; sourceLang: string; targetLang: string }>();
  public liveOutput$: Observable<string>;

  constructor(private translatorApi: TranslatorApiAdapter,
              private platform: Platform) {
    this.checkInitialSupport();

    this.liveOutput$ = this.liveInputSubject.pipe(
      debounceTime(150),
      distinctUntilChanged((prev, curr) => prev.text === curr.text && prev.targetLang === curr.targetLang),
      switchMap(({ text, sourceLang, targetLang }) => {
        if (!text || !text.trim()) {
          return of('');
        }
        return from(this.translate(text, sourceLang, targetLang)).pipe(
          catchError(() => of(text))
        );
      })
    );
  }

  /**
   * Safely updates a signal asynchronously to avoid NG0600 inside reactive contexts
   */
  public safeSetSignal<T>(sig: WritableSignal<T>, value: T): void {
    Promise.resolve().then(() => sig.set(value));
  }

  public safeSetModelStatus(status: TranslationModelStatus): void {
    this.safeSetSignal(this.modelStatus, status);
  }

  /**
   * Returns true if on-device translation can be used here: the browser exposes the
   * Translator API and the device is not mobile (the API is desktop-only).
   */
  public isSupported(): boolean {
    return this.unsupportedReason() === undefined;
  }

  /**
   * Why on-device translation is unavailable, or undefined when it is supported.
   */
  public unsupportedReason(): TranslationUnsupportedReason | undefined {
    if (this.platform.ANDROID || this.platform.IOS) return 'mobile';
    if (!this.translatorApi.isAvailable()) return 'browser';
    return undefined;
  }

  private checkInitialSupport(): void {
    if (this.isSupported()) {
      this.safeSetSignal(this.modelStatus, 'ready');
    } else {
      this.safeSetSignal(this.modelStatus, 'unavailable');
    }
  }

  public normalizeLanguageCode(lang: string | undefined): string {
    if (!lang || lang === 'unspecified') return 'en';
    return lang.split('-')[0].toLowerCase();
  }

  public async canTranslate(sourceLang: string, targetLang: string): Promise<TranslationCapability> {
    const s = this.normalizeLanguageCode(sourceLang);
    const t = this.normalizeLanguageCode(targetLang);

    if (s === t) {
      return { available: true, status: 'readily' };
    }

    if (!this.isSupported()) {
      return { available: false, status: 'no' };
    }

    const pairKey = `${s}->${t}`;
    if (this.unsupportedPairs.has(pairKey)) {
      return { available: false, status: 'no' };
    }

    try {
      const result = await this.translatorApi.availability(s, t);

      // Check for available / readily
      const isReadily = result === 'available';
      // Check for downloadable / after-download
      const isAfterDownload = result === 'downloadable' || result === 'downloading';

      if (isReadily) {
        return { available: true, status: 'readily' };
      }
      if (isAfterDownload) {
        return { available: true, status: 'after-download' };
      }
      if (result === 'unavailable') {
        this.unsupportedPairs.add(pairKey);
        return { available: false, status: 'no' };
      }

      return { available: true, status: 'readily' };
    } catch (err: any) {
      if (err?.name === 'NotSupportedError') {
        this.unsupportedPairs.add(pairKey);
      }
      return { available: false, status: 'no' };
    }
  }

  /**
   * Checks model status for a pair and updates the modelStatus signal
   */
  public async checkModelStatus(sourceLang: string, targetLang: string): Promise<TranslationModelStatus> {
    const s = this.normalizeLanguageCode(sourceLang);
    const t = this.normalizeLanguageCode(targetLang);
    if (s === t) {
      this.safeSetSignal(this.modelStatus, 'ready');
      return 'ready';
    }

    if (!this.isSupported()) {
      this.safeSetSignal(this.modelStatus, 'unavailable');
      return 'unavailable';
    }

    const cap = await this.canTranslate(s, t);
    if (cap.status === 'readily') {
      this.safeSetSignal(this.modelStatus, 'ready');
      return 'ready';
    } else if (cap.status === 'after-download') {
      this.safeSetSignal(this.modelStatus, 'downloadable');
      return 'downloadable';
    } else {
      this.safeSetSignal(this.modelStatus, 'error');
      return 'error';
    }
  }

  /**
   * Directly downloads and warms up the translation model using a user gesture
   */
  public async downloadModel(sourceLang: string, targetLang: string): Promise<boolean> {
    const s = this.normalizeLanguageCode(sourceLang);
    const t = this.normalizeLanguageCode(targetLang);
    const pairKey = `${s}->${t}`;

    if (!this.isSupported()) return false;

    this.safeSetSignal(this.modelStatus, 'downloading');
    this.safeSetSignal(this.downloadProgress, 0);

    try {
      const translator = this.cachedTranslator(pairKey) ?? await this.translatorApi.create(this.createOptions(s, t));

      if (translator) {
        this.cacheTranslator(pairKey, translator);
        this.safeSetSignal(this.modelStatus, 'ready');
        this.safeSetSignal(this.downloadProgress, 100);
        this.safeSetSignal(this.lastError, undefined);
        this.modelReadySubject.next({ sourceLang: s, targetLang: t });
        return true;
      }
      return false;
    } catch (err: any) {
      const msg = err?.message || String(err);
      this.safeSetSignal(this.modelStatus, 'error');
      this.safeSetSignal(this.lastError, msg);
      return false;
    }
  }

  /**
   * Initializes or re-uses a Translator instance for the specified language pair.
   * If userInitiated is false and the model requires download, returns null to avoid NotAllowedError.
   */
  public async getOrCreateTranslator(sourceLang: string, targetLang: string, userInitiated = false): Promise<BrowserTranslator | null> {
    const s = this.normalizeLanguageCode(sourceLang);
    const t = this.normalizeLanguageCode(targetLang);
    const pairKey = `${s}->${t}`;

    const cached = this.cachedTranslator(pairKey);
    if (cached) {
      return cached;
    }

    if (this.unsupportedPairs.has(pairKey)) {
      return null;
    }

    // Reuse pending initialization if one is already running for this pair. A user-initiated
    // request must not join a background one, which would skip a needed download.
    const pending = this.pendingInits.get(pairKey);
    if (pending && (pending.userInitiated || !userInitiated)) {
      return pending.promise;
    }

    if (!this.isSupported()) {
      this.safeSetSignal(this.modelStatus, 'unavailable');
      return null;
    }

    // Registered before the first await so concurrent callers share one creation
    const entry: { promise: Promise<BrowserTranslator | null>; userInitiated: boolean } = { promise: Promise.resolve(null), userInitiated };
    entry.promise = (async () => {
      try {
        const capability = await this.canTranslate(s, t);
        if (!capability.available || capability.status === 'no') {
          this.safeSetSignal(this.modelStatus, 'error');
          this.safeSetSignal(this.lastError, `Translation pair ${s.toUpperCase()} -> ${t.toUpperCase()} is not supported by Chrome AI.`);
          return null;
        }

        // If download is needed and this is not user-initiated, do not trigger background creation
        if (capability.status === 'after-download') {
          if (!userInitiated) {
            this.safeSetSignal(this.modelStatus, 'downloadable');
            return null;
          }
        }

        this.safeSetSignal(this.modelStatus, 'downloading');
        this.safeSetSignal(this.downloadProgress, 0);

        const translator = await this.translatorApi.create(this.createOptions(s, t));

        this.cacheTranslator(pairKey, translator);
        this.safeSetSignal(this.modelStatus, 'ready');
        this.safeSetSignal(this.downloadProgress, 100);
        this.safeSetSignal(this.lastError, undefined);
        this.modelReadySubject.next({ sourceLang: s, targetLang: t });
        return translator;
      } catch (err: any) {
        const msg = err?.message || String(err);
        if (err?.name === 'NotSupportedError') {
          this.unsupportedPairs.add(pairKey);
        }
        this.safeSetSignal(this.modelStatus, 'error');
        this.safeSetSignal(this.lastError, msg);
        return null;
      } finally {
        if (this.pendingInits.get(pairKey) === entry) {
          this.pendingInits.delete(pairKey);
        }
      }
    })();
    this.pendingInits.set(pairKey, entry);

    return entry.promise;
  }

  private cachedTranslator(pairKey: string): BrowserTranslator | undefined {
    const translator = this.translators.get(pairKey);
    if (translator) {
      // Re-insert to mark as most recently used
      this.translators.delete(pairKey);
      this.translators.set(pairKey, translator);
    }
    return translator;
  }

  private cacheTranslator(pairKey: string, translator: BrowserTranslator): void {
    const existing = this.translators.get(pairKey);
    if (existing && existing !== translator) {
      this.destroyTranslator(existing);
    }
    this.translators.delete(pairKey);
    this.translators.set(pairKey, translator);
    while (this.translators.size > this.MAX_TRANSLATORS) {
      const [oldestKey, oldest] = this.translators.entries().next().value as [string, BrowserTranslator];
      this.translators.delete(oldestKey);
      this.destroyTranslator(oldest);
    }
  }

  private destroyTranslator(translator: BrowserTranslator): void {
    if (typeof translator.destroy === 'function') {
      try {
        translator.destroy();
      } catch (e) {
        // ignore cleanup error
      }
    }
  }

  private createOptions(sourceLanguage: string, targetLanguage: string): TranslatorCreateOptions {
    return {
      sourceLanguage,
      targetLanguage,
      monitor: (m: EventTarget) => {
        m.addEventListener('downloadprogress', (e: Event) => {
          // Chrome reports loaded as a 0..1 fraction (total is 1); tolerate byte counts too
          const { loaded, total } = e as ProgressEvent;
          const fraction = total > 0 ? loaded / total : loaded;
          this.safeSetSignal(this.downloadProgress, Math.round(Math.min(Math.max(fraction, 0), 1) * 100));
        });
      }
    };
  }

  public async translate(text: string, sourceLang: string, targetLang: string): Promise<string> {
    const s = this.normalizeLanguageCode(sourceLang);
    const t = this.normalizeLanguageCode(targetLang);

    if (!text || !text.trim() || s === t) {
      return text;
    }

    const pairKey = `${s}->${t}`;
    if (this.unsupportedPairs.has(pairKey)) {
      return text;
    }

    try {
      const translator = await this.getOrCreateTranslator(s, t, false);
      if (translator && typeof translator.translate === 'function') {
        const result = await translator.translate(text);
        if (result && result.trim()) {
          return result;
        }
      }
      return text;
    } catch (err: any) {
      console.warn('Translate execution failed:', err);
      return text;
    }
  }

  public queueLiveTranslation(text: string, sourceLang: string, targetLang: string): void {
    const s = this.normalizeLanguageCode(sourceLang);
    const t = this.normalizeLanguageCode(targetLang);
    if (s === t) return;
    this.liveInputSubject.next({ text, sourceLang: s, targetLang: t });
  }

  public async translateSegments(segments: string[], sourceLang: string, targetLang: string): Promise<string[]> {
    const s = this.normalizeLanguageCode(sourceLang);
    const t = this.normalizeLanguageCode(targetLang);

    if (s === t || !segments || segments.length === 0) {
      return segments;
    }

    const pairKey = `${s}->${t}`;
    if (this.unsupportedPairs.has(pairKey)) {
      return segments;
    }

    const promises = segments.map(async (segment) => {
      const cacheKey = `${s}->${t}:${segment}`;
      if (this.segmentCache.has(cacheKey)) {
        return this.segmentCache.get(cacheKey)!;
      }
      const translated = await this.translate(segment, s, t);
      // Only cache if translation actually succeeded and produced translated text
      if (translated && (translated !== segment || s === t)) {
        this.cacheSegment(cacheKey, translated);
      }
      return translated;
    });

    return await Promise.all(promises);
  }

  private cacheSegment(cacheKey: string, translated: string): void {
    this.segmentCache.delete(cacheKey);
    this.segmentCache.set(cacheKey, translated);
    if (this.segmentCache.size > this.MAX_CACHED_SEGMENTS) {
      const oldestKey = this.segmentCache.keys().next().value as string;
      this.segmentCache.delete(oldestKey);
    }
  }

  /**
   * Drops translated text from the ending session. Translators (downloaded models) are kept.
   */
  public clearSessionCache(): void {
    this.segmentCache.clear();
  }

  public destroy(): void {
    this.translators.forEach((translator) => this.destroyTranslator(translator));
    this.translators.clear();
    this.segmentCache.clear();
  }
}
