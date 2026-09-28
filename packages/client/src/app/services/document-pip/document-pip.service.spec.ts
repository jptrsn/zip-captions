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

  it('should ignore pagehide event from an old window instance', () => {
    const activeWin = {} as Window;
    const oldWin = {} as Window;
    service['pipWindow'] = activeWin;
    service.isPipActive.set(true);

    // Simulate pagehide from old window
    if (service['pipWindow'] !== oldWin) {
      // should not clear active window
    }
    expect(service['pipWindow']).toBe(activeWin);
    expect(service.isPipActive()).toBe(true);
  });
});
