import Dexie, { Table } from 'dexie';
import { Transcript, TranscriptTextSegment } from 'shared-ui';

export class LocalDb extends Dexie {
  transcripts!: Table<Transcript, number>;
  transcriptSegments!: Table<TranscriptTextSegment, number>;

  constructor(dbName?: string) {
    
    super(dbName || 'ngdexieliveQuery')
    this.version(1).stores({
      // Primary key: id (auto-incremented)
      // Indexes: userIdHash, [userIdHash+id] (compound index)
      transcripts: '++id, userIdHash, [userIdHash+id]',
      // Primary key: id (auto-incremented)
      // Indexes: [userIdHash+transcriptId] (compound index), transcriptId
      transcriptSegments: '++id, [userIdHash+transcriptId], transcriptId'
    });
  }

}