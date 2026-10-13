import { Signal, WritableSignal, computed, signal } from '@angular/core';
import { CaptionSegment } from '../../models/caption-segment.model';
import { SegmentTranslation, mergeTranslations, planTranslations } from './segment-translations';

/**
 * Translates texts from a source language. A null entry means that text could not really be translated,
 * as opposed to text that is already in the target language, which comes back unchanged.
 */
export type TranslateFn = (texts: string[], sourceLang: string, targetLang: string) => Promise<(string | null)[]>;

/**
 * Translations for a list of caption segments, keyed by segment ID so a late result can never land on
 * the wrong caption. Each segment translates from its own language, and one that is already in the
 * target language passes through. A segment that fails stays pending (it has no translation).
 *
 * Plain TypeScript apart from the signals, so it can be driven by a component, a service, or a test.
 */
export class SegmentTranslationSession {
  private current: WritableSignal<Map<string, SegmentTranslation>> = signal(new Map());
  // The previous target's translations, shown until the new ones land so a pane doesn't blank
  private previous: WritableSignal<Map<string, SegmentTranslation>> = signal(new Map());
  private requested = new Set<string>();
  private latest: CaptionSegment[] = [];
  // Incremented on every reset, so results still in flight for an older state are discarded
  private generation = 0;

  /** Translations to display, by segment ID */
  public readonly translations: Signal<Map<string, SegmentTranslation>> = computed(() => {
    const previous = this.previous();
    const current = this.current();
    return previous.size ? new Map([...previous, ...current]) : current;
  });

  constructor(private translate: TranslateFn) {}

  /**
   * Translates segments that have no translation yet (or whose language changed) into `target`.
   * `retranslateAll` starts over, for a changed target language or a model that has become ready.
   */
  public update(segments: CaptionSegment[], target: string, retranslateAll = false): void {
    this.latest = segments;
    if (retranslateAll) {
      const shown = this.translations();
      this.clear();
      this.previous.set(shown);
    }
    const generation = this.generation;
    const groups = planTranslations(segments, this.current(), target, this.requested);
    groups.forEach(({ sourceLang, segments: pending, passThrough }) => {
      pending.forEach((segment) => this.requested.add(segment.id));
      const texts = pending.map((segment) => segment.text);
      const result = passThrough ? Promise.resolve<(string | null)[]>(texts) : this.translate(texts, sourceLang, target);
      result.then((translated) => {
        if (generation !== this.generation) return;
        pending.forEach((segment) => this.requested.delete(segment.id));
        const done = pending.filter((_, index) => typeof translated[index] === 'string');
        const doneTexts = done.map((segment) => translated[pending.indexOf(segment)] as string);
        this.current.update((map) => mergeTranslations(map, this.latest, done, doneTexts));
        if (this.requested.size === 0) {
          this.previous.set(new Map());
        }
      }).catch((err) => {
        if (generation !== this.generation) return;
        pending.forEach((segment) => this.requested.delete(segment.id));
        console.warn('Segment translation failed:', err);
      });
    });
  }

  /** Forgets every translation, including those shown while waiting for new ones */
  public reset(): void {
    this.clear();
    this.previous.set(new Map());
  }

  private clear(): void {
    this.generation++;
    this.requested.clear();
    this.current.set(new Map());
  }
}
