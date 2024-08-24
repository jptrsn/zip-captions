import Dexie, { Table } from 'dexie';
import { Transcript, TranscriptTextSegment } from 'shared-ui';

export class LocalDb extends Dexie {
  transcripts!: Table<Transcript, number>;
  transcriptSegments!: Table<TranscriptTextSegment, number>;

  constructor(dbName?: string) {
    
    super(dbName || 'ngdexieliveQuery')
    this.version(1).stores({
      transcripts: '++id, userIdHash',
      transcriptSegments: '++id, [userIdHash+transcriptId]'
    });
    this.on('populate', () => this.populate())
  }

  async populate() {
    console.log('localdb populate')
    
  }
}