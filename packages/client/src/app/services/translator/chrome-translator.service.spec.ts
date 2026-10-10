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

  it('normalizes dialect language codes', () => {
    setup();
    expect(service.normalizeLanguageCode('en-US')).toBe('en');
    expect(service.normalizeLanguageCode('es-MX')).toBe('es');
    expect(service.normalizeLanguageCode('uk-UA')).toBe('uk');
    expect(service.normalizeLanguageCode('unspecified')).toBe('en');
    expect(service.normalizeLanguageCode('')).toBe('en');
  });
});
