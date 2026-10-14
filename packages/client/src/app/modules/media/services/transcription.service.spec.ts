import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { webcrypto } from 'crypto';
import { of } from 'rxjs';
import { LocalDbService } from '../../../services/local-db/local-db.service';
import { TranscriptionService } from './transcription.service';

describe('TranscriptionService', () => {
  const dbTokenUrl = 'http://localhost:3000/v1/user/dbToken';
  let http: HttpTestingController;
  let localDb: Record<string, jest.Mock>;

  const create = (): TranscriptionService => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: LocalDbService, useValue: localDb },
        { provide: TranslateService, useValue: { get: jest.fn(() => of('Untitled transcript')) } },
      ],
    });
    http = TestBed.inject(HttpTestingController);
    return TestBed.inject(TranscriptionService);
  };

  beforeAll(() => {
    // jsdom has no Web Crypto
    if (!globalThis.crypto?.getRandomValues) {
      Object.defineProperty(globalThis, 'crypto', { value: webcrypto, configurable: true });
    }
  });

  beforeEach(() => {
    localStorage.clear();
    localDb = {
      init: jest.fn().mockResolvedValue(undefined),
      deInitDatabase: jest.fn().mockResolvedValue(undefined),
      createTranscript: jest.fn().mockResolvedValue(11),
      createTranscriptSegment: jest.fn().mockResolvedValue(21),
      updateTranscript: jest.fn().mockResolvedValue(1),
      listTranscripts: jest.fn().mockResolvedValue([]),
    };
  });

  afterEach(() => http.verify());

  describe('encryption key', () => {
    it('creates a key on first use and keeps it in local storage', () => {
      create();
      expect(localStorage.getItem('zip_captions_transcription')).toBeTruthy();
    });

    it('reuses the stored key', async () => {
      localStorage.setItem('zip_captions_transcription', 'stored-key');
      const service = create();
      const init = service.initTranscriptDatabase('u1');
      const req = http.expectOne(dbTokenUrl);
      expect(req.request.body).toEqual({ key: 'stored-key' });
      req.flush({ token: 'abcd' });
      await init;
    });
  });

  describe('database', () => {
    it('is not initialised until the server has answered and the database has opened', async () => {
      const service = create();
      expect(service.dbIsInitialized()).toBe(false);
      const init = service.initTranscriptDatabase('u1');
      http.expectOne(dbTokenUrl).flush({ token: 'ab' });
      await init;
      expect(localDb['init']).toHaveBeenCalledWith('u1', new Uint8Array([0, 97, 0, 98]));
      expect(service.dbIsInitialized()).toBe(true);
    });

    it('is closed again on de-initialisation', async () => {
      const service = create();
      const init = service.initTranscriptDatabase('u1');
      http.expectOne(dbTokenUrl).flush({ token: 'ab' });
      await init;
      await service.deInitTranscriptDatabase();
      expect(localDb['deInitDatabase']).toHaveBeenCalled();
      expect(service.dbIsInitialized()).toBe(false);
    });
  });

  describe('transcripts', () => {
    it('uses the given title, or the translated blank title', async () => {
      const service = create();
      await service.createTranscript('Sunday service');
      expect(localDb['createTranscript']).toHaveBeenCalledWith('Sunday service');
      await service.createTranscript();
      expect(localDb['createTranscript']).toHaveBeenLastCalledWith('Untitled transcript');
    });

    it('refuses to add a segment before a transcript exists', async () => {
      await expect(create().createTranscriptSegment('hello', undefined)).rejects.toThrow('No transcript ID set');
    });

    it('adds segments to the current transcript, starting at the given time or where the last one ended', async () => {
      const service = create();
      const id = await service.createTranscript('T');
      const start = new Date('2026-01-01T10:00:00Z');
      await service.createTranscriptSegment('hello', start);
      expect(localDb['createTranscriptSegment']).toHaveBeenLastCalledWith(expect.objectContaining({ transcriptId: id, text: 'hello', start }));
      await service.createTranscriptSegment('again', undefined);
      const second = localDb['createTranscriptSegment'].mock.calls[1][0];
      expect(second.text).toBe('again');
      expect(second.start).toBeInstanceOf(Date);
      expect(second.start.getTime()).toBeGreaterThanOrEqual(second.end.getTime() - 5000);
    });

    it('refuses to finalise without a transcript', () => {
      expect(() => create().finalizeTranscript()).toThrow('No transcript ID set');
    });

    it('stamps the end time when finalising, and then needs a new transcript', async () => {
      const service = create();
      const id = await service.createTranscript('T');
      await new Promise((resolve) => service.finalizeTranscript().subscribe({ complete: () => resolve(undefined) }));
      expect(localDb['updateTranscript']).toHaveBeenCalledWith(id, { end: expect.any(Date) });
      await expect(service.createTranscriptSegment('late', undefined)).rejects.toThrow('No transcript ID set');
    });
  });
});
