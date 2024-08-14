import Dexie, { Table } from 'dexie';
import { Transcript, TranscriptTextSegment } from '../../models/transcript.model';

export class LocalDb extends Dexie {
  transcripts!: Table<Transcript, string>;
  transcriptSegments!: Table<TranscriptTextSegment, string>;

  constructor(dbName?: string) {
    super(dbName || 'ngdexieliveQuery')
    this.version(3).stores({
      transcripts: '@@id, userIdHash',
      transcriptSegments: '@@id, userIdHash, transcriptId'
    });
    this.on('populate', () => this.populate())
  }

  async populate() {
    console.log('localdb populate')
    
  }
}