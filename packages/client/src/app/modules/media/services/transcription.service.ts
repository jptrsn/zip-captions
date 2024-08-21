import { Inject, Injectable } from '@angular/core';
import { LocalDbService } from '../../../services/local-db/local-db.service';

@Injectable({
  providedIn: 'root'
})
export class TranscriptionService {

  private transcriptId?: number;
  private lastTimestamp?: Date;
  constructor(@Inject(LocalDbService) private localDb: LocalDbService) {

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
}
