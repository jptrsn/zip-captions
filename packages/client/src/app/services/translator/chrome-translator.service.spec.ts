import { Platform } from '@angular/cdk/platform';
import { TestBed } from '@angular/core/testing';
import { ChromeTranslatorService } from './chrome-translator.service';
import { BrowserTranslator, TranslatorApiAdapter, TranslatorAvailability, TranslatorCreateOptions } from './translator-api.adapter';

// Signals are written on a microtask (safeSetSignal), so let them settle before asserting
const flushMicrotasks = () => new Promise((resolve) => setTimeout(resolve, 0));

describe('ChromeTranslatorService', () => {
  let service: ChromeTranslatorService;
  let adapter: {
    isAvailable: jest.Mock<boolean, []>;
    availability: jest.Mock<Promise<TranslatorAvailability>, [string, string]>;
    create: jest.Mock<Promise<BrowserTranslator>, [TranslatorCreateOptions]>;
  };
  let platform: { ANDROID: boolean; IOS: boolean };
  let translator: { translate: jest.Mock<Promise<string>, [string]>; destroy: jest.Mock };

  const setup = () => {
    TestBed.configureTestingModule({
      providers: [
        ChromeTranslatorService,
        { provide: TranslatorApiAdapter, useValue: adapter },
        { provide: Platform, useValue: platform }
      ]
    });
    service = TestBed.inject(ChromeTranslatorService);
  };

  beforeEach(() => {
    translator = {
      translate: jest.fn((text: string) => Promise.resolve(`fr:${text}`)),
      destroy: jest.fn()
    };
    adapter = {
      isAvailable: jest.fn(() => true),
      availability: jest.fn((_source: string, _target: string) => Promise.resolve<TranslatorAvailability>('available')),
      create: jest.fn((_options: TranslatorCreateOptions) => Promise.resolve<BrowserTranslator>(translator))
    };
    platform = { ANDROID: false, IOS: false };
  });

  describe('eligibility', () => {
    it('is supported on desktop when the Translator API is present', () => {
      setup();
      expect(service.isSupported()).toBe(true);
      expect(service.unsupportedReason()).toBeUndefined();
    });

    it('is unsupported on Android even when the API is present', () => {
      platform.ANDROID = true;
      setup();
      expect(service.isSupported()).toBe(false);
      expect(service.unsupportedReason()).toBe('mobile');
    });

    it('is unsupported on iOS', () => {
      platform.IOS = true;
      setup();
      expect(service.unsupportedReason()).toBe('mobile');
    });

    it('is unsupported in browsers without the Translator API', () => {
      adapter.isAvailable.mockReturnValue(false);
      setup();
      expect(service.isSupported()).toBe(false);
      expect(service.unsupportedReason()).toBe('browser');
    });
  });

  describe('canTranslate', () => {
    beforeEach(() => setup());

    it('maps "available" to readily', async () => {
      await expect(service.canTranslate('en-US', 'fr')).resolves.toEqual({ available: true, status: 'readily' });
      expect(adapter.availability).toHaveBeenCalledWith('en', 'fr');
    });

    it('maps "downloadable" to after-download', async () => {
      adapter.availability.mockResolvedValue('downloadable');
      await expect(service.canTranslate('en', 'fr')).resolves.toEqual({ available: true, status: 'after-download' });
    });

    it('remembers unavailable pairs without asking the browser again', async () => {
      adapter.availability.mockResolvedValue('unavailable');
      await expect(service.canTranslate('en', 'xx')).resolves.toEqual({ available: false, status: 'no' });
      await service.canTranslate('en', 'xx');
      expect(adapter.availability).toHaveBeenCalledTimes(1);
    });

    it('treats identical languages as readily without calling the browser', async () => {
      await expect(service.canTranslate('fr-CA', 'fr')).resolves.toEqual({ available: true, status: 'readily' });
      expect(adapter.availability).not.toHaveBeenCalled();
    });
  });

  describe('translate', () => {
    beforeEach(() => setup());

    it('returns the original text when source and target match', async () => {
      await expect(service.translate('Hello world', 'en', 'en')).resolves.toBe('Hello world');
      expect(adapter.create).not.toHaveBeenCalled();
    });

    it('translates with a translator for the normalized pair and reuses it', async () => {
      await expect(service.translate('Hello', 'en-US', 'fr')).resolves.toBe('fr:Hello');
      await service.translate('Bye', 'en-GB', 'fr');
      expect(adapter.create).toHaveBeenCalledTimes(1);
      expect(adapter.create.mock.calls[0][0]).toEqual(expect.objectContaining({ sourceLanguage: 'en', targetLanguage: 'fr' }));
    });

    it('does not create a translator that needs a download without a user gesture', async () => {
      adapter.availability.mockResolvedValue('downloadable');
      await expect(service.translate('Hello', 'en', 'fr')).resolves.toBe('Hello');
      expect(adapter.create).not.toHaveBeenCalled();
      await flushMicrotasks();
      expect(service.modelStatus()).toBe('downloadable');
    });

    it('falls back to the original text when translation throws', async () => {
      translator.translate.mockRejectedValue(new Error('boom'));
      await expect(service.translate('Hello', 'en', 'fr')).resolves.toBe('Hello');
    });
  });

  describe('downloadModel', () => {
    beforeEach(() => setup());

    it('reports progress from the download monitor and marks the model ready', async () => {
      const monitor = new EventTarget();
      let finishDownload: (t: BrowserTranslator) => void = () => undefined;
      adapter.create.mockImplementation((options) => {
        options.monitor?.(monitor);
        return new Promise<BrowserTranslator>((resolve) => (finishDownload = resolve));
      });

      const ready = jest.fn();
      service.modelReady$.subscribe(ready);

      const created = service.downloadModel('en', 'fr');
      // Chrome reports loaded as a 0..1 fraction
      const progress = Object.assign(new Event('downloadprogress'), { loaded: 0.5, total: 1 });
      monitor.dispatchEvent(progress);
      await flushMicrotasks();
      expect(service.modelStatus()).toBe('downloading');
      expect(service.downloadProgress()).toBe(50);

      finishDownload(translator);
      await expect(created).resolves.toBe(true);
      await flushMicrotasks();
      expect(service.modelStatus()).toBe('ready');
      expect(service.downloadProgress()).toBe(100);
      expect(ready).toHaveBeenCalledWith({ sourceLang: 'en', targetLang: 'fr' });
    });

    it('does nothing on ineligible devices', async () => {
      TestBed.resetTestingModule();
      platform.IOS = true;
      setup();
      await expect(service.downloadModel('en', 'fr')).resolves.toBe(false);
      expect(adapter.create).not.toHaveBeenCalled();
    });

    it('surfaces creation errors', async () => {
      adapter.create.mockRejectedValue(new Error('disk full'));
      await expect(service.downloadModel('en', 'fr')).resolves.toBe(false);
      await flushMicrotasks();
      expect(service.modelStatus()).toBe('error');
      expect(service.lastError()).toBe('disk full');
    });
  });

  describe('per-pair translator cache', () => {
    let created: Map<string, { translate: jest.Mock; destroy: jest.Mock }[]>;

    beforeEach(() => {
      created = new Map();
      adapter.create.mockImplementation((options) => {
        const pair = `${options.sourceLanguage}->${options.targetLanguage}`;
        const instance = {
          translate: jest.fn((text: string) => Promise.resolve(`${options.targetLanguage}:${text}`)),
          destroy: jest.fn()
        };
        created.set(pair, [...(created.get(pair) ?? []), instance]);
        return Promise.resolve(instance);
      });
      setup();
    });

    const allCreated = () => [...created.values()].flat();

    it('switches between pairs without destroying or recreating translators', async () => {
      await expect(service.translate('Hello', 'en', 'fr')).resolves.toBe('fr:Hello');
      await expect(service.translate('Hello', 'en', 'es')).resolves.toBe('es:Hello');
      await expect(service.translate('Bye', 'en', 'fr')).resolves.toBe('fr:Bye');

      expect(adapter.create).toHaveBeenCalledTimes(2);
      allCreated().forEach((instance) => expect(instance.destroy).not.toHaveBeenCalled());
    });

    it('shares one creation between concurrent requests for the same pair', async () => {
      await Promise.all([
        service.getOrCreateTranslator('en', 'fr'),
        service.getOrCreateTranslator('en-US', 'fr'),
      ]);
      expect(adapter.create).toHaveBeenCalledTimes(1);
    });

    it('does not let a user-initiated request join a background one that skips the download', async () => {
      adapter.availability.mockResolvedValue('downloadable');
      const [background, user] = await Promise.all([
        service.getOrCreateTranslator('en', 'fr'),
        service.getOrCreateTranslator('en', 'fr', true),
      ]);
      expect(background).toBeNull();
      expect(user).not.toBeNull();
      expect(adapter.create).toHaveBeenCalledTimes(1);
    });

    it('creates translators for different pairs concurrently', async () => {
      const [fr, es] = await Promise.all([
        service.getOrCreateTranslator('en', 'fr'),
        service.getOrCreateTranslator('en', 'es'),
      ]);
      expect(adapter.create).toHaveBeenCalledTimes(2);
      expect(fr).not.toBe(es);
    });

    it('destroys the least recently used translator beyond four pairs', async () => {
      for (const target of ['fr', 'es', 'de', 'it']) {
        await service.getOrCreateTranslator('en', target);
      }
      // Touch en->fr so en->es becomes least recently used
      await service.getOrCreateTranslator('en', 'fr');
      await service.getOrCreateTranslator('en', 'ja');

      expect(created.get('en->es')![0].destroy).toHaveBeenCalledTimes(1);
      ['en->fr', 'en->de', 'en->it', 'en->ja'].forEach((pair) => expect(created.get(pair)![0].destroy).not.toHaveBeenCalled());

      await service.getOrCreateTranslator('en', 'fr');
      expect(created.get('en->fr')!.length).toBe(1);
    });

    it('caches the translator prepared by downloadModel', async () => {
      await service.downloadModel('en', 'fr');
      await expect(service.translate('Hello', 'en', 'fr')).resolves.toBe('fr:Hello');
      expect(adapter.create).toHaveBeenCalledTimes(1);
    });

    it('reuses a cached translator when downloading the same pair again', async () => {
      const ready = jest.fn();
      service.modelReady$.subscribe(ready);
      await service.downloadModel('en', 'fr');
      await service.downloadModel('en', 'fr');
      expect(adapter.create).toHaveBeenCalledTimes(1);
      expect(ready).toHaveBeenCalledTimes(2);
    });

    it('destroy() destroys every cached translator', async () => {
      await service.getOrCreateTranslator('en', 'fr');
      await service.getOrCreateTranslator('en', 'es');
      service.destroy();
      allCreated().forEach((instance) => expect(instance.destroy).toHaveBeenCalledTimes(1));
    });
  });

  describe('segment cache', () => {
    beforeEach(() => setup());

    it('reuses translations within a session', async () => {
      await service.translateSegments(['one', 'two'], 'en', 'fr');
      await expect(service.translateSegments(['one', 'two'], 'en', 'fr')).resolves.toEqual(['fr:one', 'fr:two']);
      expect(translator.translate).toHaveBeenCalledTimes(2);
    });

    it('does not retain translations after the session cache is cleared, but keeps the translator', async () => {
      await service.translateSegments(['one'], 'en', 'fr');
      service.clearSessionCache();
      await service.translateSegments(['one'], 'en', 'fr');
      expect(translator.translate).toHaveBeenCalledTimes(2);
      expect(adapter.create).toHaveBeenCalledTimes(1);
      expect(translator.destroy).not.toHaveBeenCalled();
    });

    it('holds at most 500 translations, evicting the oldest', async () => {
      const segments = Array.from({ length: 501 }, (_, i) => `line ${i}`);
      await service.translateSegments(segments, 'en', 'fr');
      translator.translate.mockClear();

      await service.translateSegments(['line 500', 'line 1'], 'en', 'fr');
      expect(translator.translate).not.toHaveBeenCalled();
      await service.translateSegments(['line 0'], 'en', 'fr');
      expect(translator.translate).toHaveBeenCalledWith('line 0');
    });
  });

  it('normalizes dialect language codes', () => {
    setup();
    expect(service.normalizeLanguageCode('en-US')).toBe('en');
    expect(service.normalizeLanguageCode('es-MX')).toBe('es');
    expect(service.normalizeLanguageCode('uk-UA')).toBe('uk');
    expect(service.normalizeLanguageCode('unspecified')).toBe('en');
    expect(service.normalizeLanguageCode('')).toBe('en');
  });
});
