import { Inject, Injectable } from '@angular/core';
import { LocalDbService } from '../../../services/local-db/local-db.service';

@Injectable({
  providedIn: 'root'
})
export class TranscriptionService {

  private transcriptId?: number;
  private lastTimestamp?: Date;
  private key: string;
  constructor(@Inject(LocalDbService) private localDb: LocalDbService) {
    const key = localStorage.getItem('zip_captions_transcription');
    if (key) {
      this.key = key;
    } else {
      const array = new Uint8Array(32);
      self.crypto.getRandomValues(array);
      this.key = this._bytesToSring(array);
      localStorage.setItem('zip_captions_transcription', this.key);
    }
  }

  async initTranscriptDatabase(userId: string): Promise<void> {
    const encoded = this._stringToBytes(this.key)
    await this.localDb.init(userId, encoded);
  }

  async deInitTranscriptDatabase(): Promise<void> {
    this.transcriptId = undefined;
    this.lastTimestamp = undefined;
    await this.localDb.deInitDatabase();
    console.log('deinit transcript db');
  }

  async createTranscript(title: string): Promise<number> {
    this.transcriptId = await this.localDb.createTranscript(title);
    this.lastTimestamp = new Date();
    return this.transcriptId;
  }

  async createTranscriptSegment(text: string): Promise<number> {
    if (this.transcriptId === undefined) {
      throw new Error('No transcript ID set')
    } 
    if (!this.lastTimestamp) {
      throw new Error('No start timestamp defined')
    }
    const result = await this.localDb.createTranscriptSegment({
      transcriptId: this.transcriptId,
      text,
      start: this.lastTimestamp,
      end: new Date()
    });
    this.lastTimestamp = new Date();
    return result;
  }

  async finalizeTranscript(): Promise<void> {
    if (!this.transcriptId) {
      throw new Error('No transcript ID set')
    }
    await this.localDb.updateTranscript(this.transcriptId, { end: new Date() })
    this.transcriptId = undefined;
    this.lastTimestamp = undefined;
  }

  // https://codereview.stackexchange.com/a/3589/75693
private _bytesToSring(bytes: Uint8Array): string {
  const chars = [];
  for(let i = 0, n = bytes.length; i < n;) {
      chars.push(((bytes[i++] & 0xff) << 8) | (bytes[i++] & 0xff));
  }
  return String.fromCharCode.apply(null, chars);
}

// https://codereview.stackexchange.com/a/3589/75693
private _stringToBytes(str: string): Uint8Array {
  const bytes = [];
  for(let i = 0, n = str.length; i < n; i++) {
      const char = str.charCodeAt(i);
      bytes.push(char >>> 8, char & 0xFF);
  }
  return new Uint8Array(bytes);
}
}
