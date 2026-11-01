import { TestBed } from '@angular/core/testing';

import { FullScreenService } from './full-screen.service';

describe('FullScreenService', () => {
  let service: FullScreenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FullScreenService);
  });

  afterEach(() => {
    Object.defineProperty(document, 'fullscreenElement', {
      value: null,
      configurable: true
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should synchronize isFullscreen on document fullscreenchange and allow toggle to exit when using documentElement fallback', () => {
    service.isAvailable = true;
    const requestSpy = jest.fn();
    const exitSpy = jest.fn();
    Object.defineProperty(document.documentElement, 'requestFullscreen', {
      value: requestSpy,
      configurable: true
    });
    Object.defineProperty(document, 'exitFullscreen', {
      value: exitSpy,
      configurable: true
    });

    // Maximize via document.documentElement fallback (no element registered)
    service.toggle();
    expect(requestSpy).toHaveBeenCalled();

    // Simulate entering fullscreen on document.documentElement
    Object.defineProperty(document, 'fullscreenElement', {
      value: document.documentElement,
      configurable: true
    });
    document.dispatchEvent(new Event('fullscreenchange'));
    expect(service.isFullscreen()).toBe(true);

    // Toggling again should exit fullscreen
    service.toggle();
    expect(exitSpy).toHaveBeenCalled();

    // Simulate exiting fullscreen
    Object.defineProperty(document, 'fullscreenElement', {
      value: null,
      configurable: true
    });
    document.dispatchEvent(new Event('fullscreenchange'));
    expect(service.isFullscreen()).toBe(false);
  });
});
