export interface Transcript {
  id?: string;
  userIdHash: string;
  title?: string;
}

export interface TranscriptTextSegment extends TranscriptTextSegmentUpdate {
  id?: string;
  transcriptId: string;
  userIdHash: string;
}

export interface TranscriptTextSegmentUpdate {
  start: Date;
  end: Date;
  text: string;
}