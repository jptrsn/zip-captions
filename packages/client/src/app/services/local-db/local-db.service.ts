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
    this.initStoragePersistence();
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

  // Storage Manager API methods from https://dexie.org/docs/StorageManager

  public async initStoragePersistence() {
    const persist = await this.tryPersistWithoutPromtingUser();
    switch (persist) {
      case "never":
        console.log("Not possible to persist storage");
        break;
      case "persisted":
        console.log("Successfully persisted storage silently");
        break;
      case "prompt":
        console.log("Not persisted, but we may prompt user when we want to.");
        break;
    }
  }
  
  /** Check if storage is persisted already.
  @returns {Promise<boolean | undefined>} Promise resolved with true if current origin is
  using persistent storage, false if not, and undefined if the API is not
  present.
  */
  public async isStoragePersisted(): Promise<boolean | undefined> {
    return await navigator.storage && navigator.storage.persisted ? navigator.storage.persisted() : undefined;
  }

  /** Tries to convert to persisted storage.
  @returns {Promise<boolean | undefined>} Promise resolved with true if successfully
  persisted the storage, false if not, and undefined if the API is not present.
  */
  public async persist(): Promise<boolean | undefined> {
    return navigator.storage && navigator.storage.persist ? navigator.storage.persist() : undefined;
  }

  /** Queries available disk quota.
  @see https://developer.mozilla.org/en-US/docs/Web/API/StorageEstimate
  @returns {Promise<StorageEstimate | undefined>} Promise resolved with
  {quota: number, usage: number} or undefined.
  */
  public async showEstimagedQuota(): Promise<StorageEstimate | undefined> {
    return navigator.storage && navigator.storage.estimate ? navigator.storage.estimate() : undefined;
  }

  /** Tries to persist storage without ever prompting user.
  @returns {Promise<string>}
    "never" In case persisting is not ever possible. Caller don't bother
      asking user for permission.
    "prompt" In case persisting would be possible if prompting user first.
    "persisted" In case this call successfully silently persisted the storage,
      or if it was already persisted.
  */
  public async tryPersistWithoutPromtingUser(): Promise<string> {
    if (!navigator.storage || !navigator.storage.persisted) {
      return "never";
    }
    let persisted = await navigator.storage.persisted();
    if (persisted) {
      return "persisted";
    }
    if (!navigator.permissions || !navigator.permissions.query) {
      return "prompt"; // It MAY be successful to prompt. Don't know.
    }
    const permission = await navigator.permissions.query({
      name: "persistent-storage"
    });
    if (permission.state === "granted") {
      persisted = await navigator.storage.persist();
      if (persisted) {
        return "persisted";
      } else {
        throw new Error("Failed to persist");
      }
    }
    if (permission.state === "prompt") {
      return "prompt";
    }
    return "never";
  }

  private async _getUserHash(userId: string): Promise<string> {
    const msgBuffer = new TextEncoder().encode(userId);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((h) => h.toString(16).padStart(2, '0')).join('');
  }

 }
