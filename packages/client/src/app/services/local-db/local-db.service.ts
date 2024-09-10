import { Injectable } from '@angular/core';
import { Observable, PromiseExtended, liveQuery } from 'dexie';
import { NON_INDEXED_FIELDS, applyEncryptionMiddleware } from 'dexie-encrypted';
import { Transcript, TranscriptTextSegment, TranscriptTextSegmentUpdate } from 'shared-ui';
import { LocalDb } from './db';
@Injectable({
  providedIn: 'root'
})
export class LocalDbService {

  private db: LocalDb;
  private userIdHash: string;
  
  constructor() { 
    this.db = new LocalDb();
    this.userIdHash = '';
  }

  public async init(userId: string, symmetricKey: Uint8Array) {
    this.db.close();
    this.userIdHash = await this._getUserHash(userId);
    this.db = new LocalDb(userId);
    applyEncryptionMiddleware(this.db, symmetricKey, {
      transcripts: NON_INDEXED_FIELDS,
      transcriptSegments: NON_INDEXED_FIELDS
    }, async () => {
        console.log('dexie encrypt onkeychange')
      }
    )
  }

  public async deInitDatabase() {
    this.db.close();
    this.userIdHash = '';
    this.db = new LocalDb();
  }
  
  listTranscripts(): Observable<Transcript[]> {
    return liveQuery(() => this.db.transcripts.where({ userIdHash: this.userIdHash }).toArray())
  }

  getTranscriptSegments(transcriptId: number): Observable<TranscriptTextSegment[]> {
    return liveQuery(() => this.db.transcriptSegments.where({ userIdHash: this.userIdHash, transcriptId }).sortBy('start'))
  }

  getTranscriptById(transcriptId: number): PromiseExtended<Transcript | undefined> {
    return this.db.transcripts.where({ userIdHash: this.userIdHash, id: transcriptId }).first();
  }

  updateTranscript(transcriptId: number, update: Partial<Transcript>): Promise<number> {
    return this.db.transcripts.update({id: transcriptId, userIdHash: this.userIdHash}, update)
  }

  createTranscript(title: string): Promise<number> {
    return this.db.transcripts.add({ title, userIdHash: this.userIdHash, start: new Date() })
  }

  createTranscriptSegment(segment: TranscriptTextSegmentUpdate): Promise<number> {
    return this.db.transcriptSegments.add({...segment, userIdHash: this.userIdHash });
  }

  updateTranscriptSegment(segmentId: number, update: Partial<TranscriptTextSegment>): Promise<number> {
    return this.db.transcriptSegments.update(segmentId, update);
  }

  deleteTranscript(transcriptId: number): Promise<void> {
    return this.db.transcripts.delete(transcriptId);
  }

  async deleteDatabase(): Promise<void> {
    await this.db.close();
    return this.db.delete({ disableAutoOpen: true });
  }

  private async _getUserHash(userId: string): Promise<string> {
    const msgBuffer = new TextEncoder().encode(userId);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((h) => h.toString(16).padStart(2, '0')).join('');
  }

 }
