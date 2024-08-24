import Dexie, { Table } from 'dexie';
import { Transcript, TranscriptTextSegment } from 'shared-ui';

export class LocalDb extends Dexie {
  transcripts!: Table<Transcript, number>;
  transcriptSegments!: Table<TranscriptTextSegment, number>;

  constructor(dbName?: string) {
    
    super(dbName || 'ngdexieliveQuery')
    this.version(4).stores({
      transcripts: '++id, userIdHash, [userIdHash+id]',
      transcriptSegments: '++id, [userIdHash+transcriptId], transcriptId'
    });
  }

}