export interface Transcript {
  id?: number;
  userIdHash: string;
  title?: string;
  description?: string;
  start?: Date;
  end?: Date;
}

export interface TranscriptTextSegment extends TranscriptTextSegmentUpdate {
  id?: number;
  userIdHash: string;
}

export interface TranscriptTextSegmentUpdate {
  transcriptId: number;
  start: Date;
  end: Date;
  text: string;
}