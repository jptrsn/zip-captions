import { TestBed } from '@angular/core/testing';
import { ElementRef } from '@angular/core';
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

  it('should toggle state or attempt toggle without error', async () => {
    await service.toggle();
    expect(service.isPipActive()).toBe(false);
  });
});
