import { Injectable, Signal, WritableSignal, computed, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { distinctUntilChanged } from 'rxjs';
import { AppState } from '../../models/app.model';
import { CaptionSegment } from '../../models/caption-segment.model';
import { RecognitionService } from '../../modules/media/services/recognition.service';
import { BilingualDialects, RecognitionDialect } from '../../modules/settings/models/settings.model';
import { recognitionIdSelector, selectRecognitionEngineProvider } from '../../selectors/recognition.selector';
import { dialectSelector, languageSelector, selectRenderHistoryLength, selectTranslationSettings } from '../../selectors/settings.selector';
import { ChromeTranslatorService, LiveTranslationChannel } from './chrome-translator.service';
import { SegmentTranslationSession } from './segment-translation-session';
import { SegmentTranslation } from './segment-translations';

/**
 * Translation of the captions this device is recognizing. One pipeline serves everything that shows or
 * sends them: the caption view and the broadcast room. Broadcast viewers translate on their own
 * device with their own `SegmentTranslationSession` instead.
 *
 * Its subscriptions are created in the constructor (Angular 16: `toObservable` needs an injection context).
 */
@Injectable({
  providedIn: 'root'
})
export class CaptionTranslationService {
  /** Recognized segments of the current session; empty while recognition is not running */
  public readonly segments: Signal<CaptionSegment[]>;
  /** The live (interim) line */
  public readonly liveText: Signal<string>;
  /** Translations by segment ID. A segment still pending, or that failed, has none. */
  public readonly translations: Signal<Map<string, SegmentTranslation>>;
  /** Translation of the live line, or '' */
  public readonly translatedLive: WritableSignal<string> = signal('');
  /** The language captions are translated into (base code as stored in the settings) */
  public readonly target: Signal<string>;
  /** Translation is supported here and the display mode isn't off */
  public readonly active: Signal<boolean>;
  /** The spoken language: the dialect when set, else the language */
  public readonly sourceLanguage: Signal<string>;

  /** How many of the newest segments are on screen, and so translated before the rest */
  private readonly visibleCount: Signal<number>;
  /**
   * The two languages shown as panes, first then second, when a bilingual model is recognizing and the
   * translation target is its other language; otherwise undefined and the panes are spoken and translated
   */
  public readonly paneLanguages: Signal<{ first: string; second: string } | undefined>;
  /** Translations into the first pane's language by segment ID; empty unless `paneLanguages` is set */
  public readonly firstTranslations: Signal<Map<string, SegmentTranslation>>;
  private session: SegmentTranslationSession;
  private firstSession: SegmentTranslationSession;
  /** This service's own live-line translator (see `createLiveChannel`) */
  private liveChannel: LiveTranslationChannel;

  constructor(private store: Store<AppState>,
              private recognitionService: RecognitionService,
              private translatorService: ChromeTranslatorService) {
    this.liveChannel = this.translatorService.createLiveChannel();
    this.session = new SegmentTranslationSession((texts, source, target) => this.translatorService.translateSegmentsStrict(texts, source, target));
    this.translations = this.session.translations;
    this.firstSession = new SegmentTranslationSession((texts, source, target) => this.translatorService.translateSegmentsStrict(texts, source, target));
    this.firstTranslations = this.firstSession.translations;

    const id: Signal<string | undefined> = toSignal(this.store.select(recognitionIdSelector));
    this.segments = computed(() => id() ? this.recognitionService.getRecognizedSegments()() : []);
    this.liveText = computed(() => id() ? this.recognitionService.getLiveOutput()() : '');

    // The caption view shows the newest segments (the history setting); those are translated first.
    // A margin covers a segment that wraps onto more than one line.
    const renderHistory = toSignal(this.store.select(selectRenderHistoryLength));
    this.visibleCount = computed(() => (renderHistory() ?? 15) + 5);

    const settings = toSignal(this.store.select(selectTranslationSettings));
    const dialect = toSignal(this.store.select(dialectSelector));
    const lang = toSignal(this.store.select(languageSelector));
    const supported = this.translatorService.isSupported();
    this.target = computed(() => settings()?.targetLanguage ?? 'es');
    this.active = computed(() => supported && (settings()?.mode ?? 'off') !== 'off');
    this.sourceLanguage = computed(() => {
      const d = dialect();
      return d && d !== 'unspecified' ? d : (lang() || 'en');
    });

    // A bilingual Azure model recognizes two languages, and each segment is tagged with the one spoken.
    // When the target is the pair's other language, the panes are those two languages, not "spoken" and
    // "translated": each shows its own language as spoken and the other's segments translated.
    const provider = toSignal(this.store.select(selectRecognitionEngineProvider));
    this.paneLanguages = computed(() => {
      const pair = provider() === 'azure' && this.active() ? BilingualDialects[this.sourceLanguage() as RecognitionDialect] : undefined;
      if (!pair || pair.length < 2) return undefined;
      return pair[1] === this.target().split('-')[0].toLowerCase() ? { first: pair[0], second: pair[1] } : undefined;
    });

    // New or changed segments
    toObservable(this.segments).subscribe((segments) => {
      if (segments.length === 0) {
        this.session.reset();
        this.firstSession.reset();
      } else if (this.active()) {
        this.session.update(segments, this.target(), false, this.visibleCount());
        this.updateFirstSession(segments, false);
      }
    });

    // Turning translation on or off, or changing its language. Layout settings share the same object,
    // so only these values are watched.
    const translationKey = computed(() => `${this.active()}|${this.target()}|${this.paneLanguages()?.first ?? ''}`);
    toObservable(translationKey).subscribe(() => {
      if (!this.active()) {
        this.session.reset();
        this.translatedLive.set('');
      } else if (this.segments().length > 0) {
        this.session.update(this.segments(), this.target(), true, this.visibleCount());
      }
      this.updateFirstSession(this.segments(), true);
    });

    // A model that has just finished downloading: translate what was waiting
    this.translatorService.modelReady$.subscribe(() => {
      if (!this.active()) return;
      if (this.segments().length > 0) {
        this.session.update(this.segments(), this.target(), true, this.visibleCount());
        this.updateFirstSession(this.segments(), true);
      }
      const live = this.liveText();
      if (live) {
        this.liveChannel.queue(live, this.sourceLanguage(), this.target(), true);
      }
    });

    // The live line
    toObservable(this.liveText).pipe(distinctUntilChanged()).subscribe((live) => {
      if (!live) {
        // The line ended: drop a translation still being made for it so it can't appear afterwards
        this.liveChannel.cancel();
        this.translatedLive.set('');
      } else if (this.active()) {
        // Within a line the previous translation stays up until the next one arrives (latest wins)
        this.liveChannel.queue(live, this.sourceLanguage(), this.target());
      }
    });

    // Translation switched on or off, or a language changed: a translation for the old pair is wrong now
    toObservable(computed(() => `${this.active()}|${this.sourceLanguage()}|${this.target()}`)).subscribe(() => {
      this.liveChannel.cancel();
      this.translatedLive.set('');
      const live = this.liveText();
      if (live && this.active()) {
        this.liveChannel.queue(live, this.sourceLanguage(), this.target(), true);
      }
    });
    this.liveChannel.output$.subscribe((translated) => this.translatedLive.set(translated));
  }

  /** Translations into the first pane's language, only while the panes are the pair's two languages */
  private updateFirstSession(segments: CaptionSegment[], retranslateAll: boolean): void {
    const panes = this.paneLanguages();
    if (!panes) {
      this.firstSession.reset();
    } else if (segments.length > 0) {
      this.firstSession.update(segments, panes.first, retranslateAll, this.visibleCount());
    }
  }
}
