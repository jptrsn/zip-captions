import { TestBed } from '@angular/core/testing';
import { ChromeTranslatorService } from './chrome-translator.service';

describe('ChromeTranslatorService', () => {
  let service: ChromeTranslatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChromeTranslatorService]
    });
    service = TestBed.inject(ChromeTranslatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should normalize dialect language codes', () => {
    expect(service.normalizeLanguageCode('en-US')).toBe('en');
    expect(service.normalizeLanguageCode('es-MX')).toBe('es');
    expect(service.normalizeLanguageCode('uk-UA')).toBe('uk');
    expect(service.normalizeLanguageCode('unspecified')).toBe('en');
    expect(service.normalizeLanguageCode('')).toBe('en');
  });

  it('should return original text if source and target languages match', async () => {
    const text = 'Hello world';
    const result = await service.translate(text, 'en', 'en');
    expect(result).toBe(text);
  });
});
