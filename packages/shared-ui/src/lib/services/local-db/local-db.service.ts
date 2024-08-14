import { Injectable } from '@angular/core';
import { genSaltSync, hashSync } from 'bcrypt';
import { Observable, liveQuery } from 'dexie';
import { NON_INDEXED_FIELDS, applyEncryptionMiddleware } from 'dexie-encrypted';
import { Transcript, TranscriptTextSegment, TranscriptTextSegmentUpdate } from '../../models/transcript.model';
import { LocalDb } from './db';
@Injectable({
  providedIn: 'root'
})
export class LocalDbService {

  private db: LocalDb;
  private userIdHash: string;
  constructor() { 
    this.db = new LocalDb();
    this.userIdHash = genSaltSync(5);
  }

  public async init(userId: string, symmetricKey: Uint8Array) {
    this.userIdHash = hashSync(userId, symmetricKey.toString());
    this.db = new LocalDb(userId);
    applyEncryptionMiddleware(this.db, symmetricKey, {
      transcripts: NON_INDEXED_FIELDS,
      transcriptSegments: NON_INDEXED_FIELDS
    }, async () => {
        console.log('dexie encrypt onkeychange')
      }
    )
  }
  
  listTranscripts(): Observable<Transcript[]> {
    return liveQuery(() => this.db.transcripts.where({ userIdHash: this.userIdHash }).toArray())
  }

  getTranscriptSegments(transcriptId: string): Observable<TranscriptTextSegment[]> {
    return liveQuery(() => this.db.transcriptSegments.where({ userIdHash: this.userIdHash, transcriptId }).sortBy('start'))
  }

  async updateTranscript(transcriptId: string, title: string): Promise<number> {
    return this.db.transcripts.update({id: transcriptId, userIdHash: this.userIdHash}, { title })
  }

  async createTranscript(title: string): Promise<string> {
    return this.db.transcripts.add({ title, userIdHash: this.userIdHash })
  }

  async createTranscriptSegment(transcriptId: string, segment: TranscriptTextSegmentUpdate): Promise<string> {
    return this.db.transcriptSegments.add({...segment, transcriptId, userIdHash: this.userIdHash });
  }
 }
