import { TestBed } from '@angular/core/testing';
import { BrowserLanguageDetector, DetectedLanguage, LanguageDetectorAdapter, LanguageDetectorAvailability } from './language-detector.adapter';
import { SegmentLanguageService, resolveSegmentLanguage } from './segment-language.service';

const pair = ['fr', 'en'];
const scored = (...entries: [string, number][]): DetectedLanguage[] => entries.map(([detectedLanguage, confidence]) => ({ detectedLanguage, confidence }));

describe('resolveSegmentLanguage', () => {
  it('takes the pair language with the higher confidence', () => {
    expect(resolveSegmentLanguage('This is spoken English', scored(['en', 0.97], ['fr', 0.01]), pair, 'fr')).toBe('en');
    expect(resolveSegmentLanguage('Ceci est du français', scored(['fr', 0.95], ['en', 0.02]), pair, 'en')).toBe('fr');
  });

  it('scores only the two languages of the pair, however sure the detector is of another', () => {
    // Spanish at 0.9 is not an option; the pair languages are both weak, so the previous language stays
    expect(resolveSegmentLanguage('Hola amigos míos', scored(['es', 0.9], ['fr', 0.06], ['en', 0.02]), pair, 'en')).toBe('en');
  });

  it('matches a regional tag to its base language', () => {
    expect(resolveSegmentLanguage('This is spoken English', scored(['en-GB', 0.9]), pair, 'fr')).toBe('en');
  });

  it('keeps the previous language for a very short text', () => {
    expect(resolveSegmentLanguage('oui', scored(['en', 0.99]), pair, 'fr')).toBe('fr');
    expect(resolveSegmentLanguage('ok merci', scored(['en', 0.99]), pair, 'fr')).toBe('en');
  });

  it('keeps the previous language when the best score is low or the two are tied', () => {
    expect(resolveSegmentLanguage('Something in between', scored(['en', 0.4], ['fr', 0.3]), pair, 'fr')).toBe('fr');
    expect(resolveSegmentLanguage('Something in between', scored(['en', 0.55], ['fr', 0.5]), pair, 'fr')).toBe('fr');
  });

  it('starts a session on the pair\'s first language when there is no previous one and nothing is clear', () => {
    expect(resolveSegmentLanguage('oui', scored(['en', 0.99]), pair)).toBe('fr');
  });
});

describe('SegmentLanguageService', () => {
  let adapter: {
    isAvailable: jest.Mock<boolean, []>;
    availability: jest.Mock<Promise<LanguageDetectorAvailability>, [string[]]>;
    create: jest.Mock<Promise<BrowserLanguageDetector>, [string[]]>;
  };
  let detector: { detect: jest.Mock<Promise<DetectedLanguage[]>, [string]>; destroy: jest.Mock };
  let service: SegmentLanguageService;

  beforeEach(() => {
    detector = { detect: jest.fn((_text: string) => Promise.resolve(scored(['en', 0.98]))), destroy: jest.fn() };
    adapter = {
      isAvailable: jest.fn(() => true),
      availability: jest.fn((_langs: string[]) => Promise.resolve<LanguageDetectorAvailability>('available')),
      create: jest.fn((_langs: string[]) => Promise.resolve<BrowserLanguageDetector>(detector)),
    };
    TestBed.configureTestingModule({ providers: [SegmentLanguageService, { provide: LanguageDetectorAdapter, useValue: adapter }] });
    service = TestBed.inject(SegmentLanguageService);
  });

  it('creates a detector for the pair once, however often it is asked', async () => {
    await expect(Promise.all([service.prepare(pair), service.prepare(pair)])).resolves.toEqual([true, true]);
    await service.prepare(pair);
    expect(adapter.create).toHaveBeenCalledTimes(1);
    expect(adapter.create).toHaveBeenCalledWith(['fr', 'en']);
  });

  it('detects the language of a segment', async () => {
    await service.prepare(pair);
    await expect(service.detect('This is spoken English', pair, 'fr', 'fr')).resolves.toBe('en');
  });

  it('returns the fallback when no detector is ready, without calling the browser', async () => {
    await expect(service.detect('This is spoken English', pair, 'fr', 'fr')).resolves.toBe('fr');
    expect(detector.detect).not.toHaveBeenCalled();
  });

  it('cannot prepare where the API is missing or the pair is unsupported', async () => {
    adapter.isAvailable.mockReturnValue(false);
    await expect(service.prepare(pair)).resolves.toBe(false);
    adapter.isAvailable.mockReturnValue(true);
    adapter.availability.mockResolvedValue('unavailable');
    await expect(service.prepare(pair)).resolves.toBe(false);
    expect(adapter.create).not.toHaveBeenCalled();
  });

  it('returns the fallback when creating the detector or detecting fails', async () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    adapter.create.mockRejectedValueOnce(new Error('NotAllowedError'));
    await expect(service.prepare(pair)).resolves.toBe(false);
    await expect(service.prepare(pair)).resolves.toBe(true);
    detector.detect.mockRejectedValueOnce(new Error('boom'));
    await expect(service.detect('This is spoken English', pair, 'fr', 'fr')).resolves.toBe('fr');
    warn.mockRestore();
  });
});
