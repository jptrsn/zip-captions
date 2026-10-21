export interface CaptionSegment {
  /** Stable for the page lifetime; never derived from array position */
  id: string;
  text: string;
  /** BCP 47 tag of the recognition language in effect when the segment was produced */
  lang: string;
  start?: Date;
}

/**
 * Appends finalized segments with IDs assigned once at creation, so IDs survive
 * history rollover. The prefix keeps IDs from different engines apart and the epoch
 * keeps them unique across page loads.
 */
export class CaptionSegmentHistory {
  private seq = 0;

  constructor(private readonly prefix: string,
              private readonly maxLength: number,
              private readonly epoch: string = Date.now().toString(36)) {}

  public append(current: CaptionSegment[], text: string, lang: string, start?: Date): CaptionSegment[] {
    const segment: CaptionSegment = { id: `${this.prefix}-${this.epoch}-${this.seq++}`, text, lang, start };
    return [...current, segment].slice(this.maxLength * -1);
  }
}
