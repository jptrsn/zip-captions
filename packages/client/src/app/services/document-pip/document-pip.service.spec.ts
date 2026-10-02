import { TestBed } from '@angular/core/testing';
import { ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { DocumentPipService } from './document-pip.service';
import { TestingModuleImports, TestingModuleProviders } from '../../../testing/test-scaffold';

describe('DocumentPipService', () => {
  let service: DocumentPipService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: TestingModuleImports,
      providers: TestingModuleProviders,
    });
    service = TestBed.inject(DocumentPipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize isPipActive as false', () => {
    expect(service.isPipActive()).toBe(false);
  });

  it('should register and deregister element', () => {
    const div = document.createElement('div');
    const elRef = new ElementRef(div);
    service.registerElement(elRef);
    expect(service['el']).toBe(elRef);

    service.deregisterElement();
    expect(service['el']).toBeUndefined();
  });

  it('should gracefully handle open when not supported', async () => {
    const div = document.createElement('div');
    service.registerElement(new ElementRef(div));
    await service.open();
    // In node/jest environment, documentPictureInPicture is not defined
    if (!service.isSupported) {
      expect(service.isPipActive()).toBe(false);
    }
  });

  it('should leave PiP inactive when toggling with no registered element', async () => {
    await service.toggle();
    expect(service.isPipActive()).toBe(false);
  });

  it('should not request a new window if open is already in progress', async () => {
    const originalDocPip = (window as any).documentPictureInPicture;
    const originalSpeech = (window as any).SpeechRecognition;
    const requestWindowMock = jest.fn();

    try {
      (window as any).documentPictureInPicture = {
        requestWindow: requestWindowMock,
      };
      (window as any).SpeechRecognition = jest.fn();

      const store = TestBed.inject(Store);
      const testService = TestBed.runInInjectionContext(() => new DocumentPipService(store));
      expect(testService.isSupported).toBe(true);

      const div = document.createElement('div');
      testService.registerElement(new ElementRef(div));

      testService['isOpening'] = true;
      await testService.open();

      expect(requestWindowMock).not.toHaveBeenCalled();
      expect(testService.isPipActive()).toBe(false);
    } finally {
      if (originalDocPip !== undefined) {
        (window as any).documentPictureInPicture = originalDocPip;
      } else {
        delete (window as any).documentPictureInPicture;
      }
      if (originalSpeech !== undefined) {
        (window as any).SpeechRecognition = originalSpeech;
      } else {
        delete (window as any).SpeechRecognition;
      }
    }
  });

  it('should ignore pagehide event from an old window instance', async () => {
    const originalDocPip = (window as any).documentPictureInPicture;
    const originalSpeech = (window as any).SpeechRecognition;
    let pagehideListener: (() => void) | undefined;

    const mockPipWindow = {
      document: {
        documentElement: { setAttribute: jest.fn() },
        body: {
          style: {},
          appendChild: jest.fn(),
        },
        createElement: (tag: string) => document.createElement(tag),
        head: { appendChild: jest.fn() },
      },
      addEventListener: jest.fn((event: string, handler: () => void) => {
        if (event === 'pagehide') {
          pagehideListener = handler;
        }
      }),
      close: jest.fn(),
    };

    try {
      (window as any).documentPictureInPicture = {
        requestWindow: jest.fn().mockResolvedValue(mockPipWindow),
      };
      (window as any).SpeechRecognition = jest.fn();

      const store = TestBed.inject(Store);
      const testService = TestBed.runInInjectionContext(() => new DocumentPipService(store));

      const div = document.createElement('div');
      testService.registerElement(new ElementRef(div));

      await testService.open();
      expect(pagehideListener).toBeDefined();
      expect(testService['pipWindow']).toBe(mockPipWindow as any);
      expect(testService.isPipActive()).toBe(true);

      // Simulate a replacement window having been set
      const replacementWindow = {} as Window;
      testService['pipWindow'] = replacementWindow;

      // Invoke the old window's pagehide listener
      pagehideListener!();

      // Verify the old window's handler does not affect the replacement window or PiP state
      expect(testService['pipWindow']).toBe(replacementWindow);
      expect(testService.isPipActive()).toBe(true);
    } finally {
      if (originalDocPip !== undefined) {
        (window as any).documentPictureInPicture = originalDocPip;
      } else {
        delete (window as any).documentPictureInPicture;
      }
      if (originalSpeech !== undefined) {
        (window as any).SpeechRecognition = originalSpeech;
      } else {
        delete (window as any).SpeechRecognition;
      }
    }
  });
});
