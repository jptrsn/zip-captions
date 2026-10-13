import { Injectable, Signal, WritableSignal, computed, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { distinctUntilChanged } from 'rxjs';
import { AppState } from '../../models/app.model';
import { CaptionSegment } from '../../models/caption-segment.model';
import { RecognitionService } from '../../modules/media/services/recognition.service';
import { recognitionIdSelector } from '../../selectors/recognition.selector';
import { dialectSelector, languageSelector, selectTranslationSettings } from '../../selectors/settings.selector';
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

  private session: SegmentTranslationSession;
  /** This service's own live-line translator (see `createLiveChannel`) */
  private liveChannel: LiveTranslationChannel;

  constructor(private store: Store<AppState>,
              private recognitionService: RecognitionService,
              private translatorService: ChromeTranslatorService) {
    this.liveChannel = this.translatorService.createLiveChannel();
    this.session = new SegmentTranslationSession((texts, source, target) => this.translatorService.translateSegmentsStrict(texts, source, target));
    this.translations = this.session.translations;

    const id: Signal<string | undefined> = toSignal(this.store.select(recognitionIdSelector));
    this.segments = computed(() => id() ? this.recognitionService.getRecognizedSegments()() : []);
    this.liveText = computed(() => id() ? this.recognitionService.getLiveOutput()() : '');

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

    // New or changed segments
    toObservable(this.segments).subscribe((segments) => {
      if (segments.length === 0) {
        this.session.reset();
      } else if (this.active()) {
        this.session.update(segments, this.target());
      }
    });

    // Turning translation on or off, or changing its language. Layout settings share the same object,
    // so only these values are watched.
    const translationKey = computed(() => `${this.active()}|${this.target()}`);
    toObservable(translationKey).subscribe(() => {
      if (!this.active()) {
        this.session.reset();
        this.translatedLive.set('');
      } else if (this.segments().length > 0) {
        this.session.update(this.segments(), this.target(), true);
      }
    });

    // A model that has just finished downloading: translate what was waiting
    this.translatorService.modelReady$.subscribe(() => {
      if (!this.active()) return;
      if (this.segments().length > 0) {
        this.session.update(this.segments(), this.target(), true);
      }
      const live = this.liveText();
      if (live) {
        this.liveChannel.queue(live, this.sourceLanguage(), this.target());
      }
    });

    // The live line
    toObservable(this.liveText).pipe(distinctUntilChanged()).subscribe((live) => {
      if (this.active() && live) {
        this.liveChannel.queue(live, this.sourceLanguage(), this.target());
      } else if (!live) {
        this.translatedLive.set('');
      }
    });
    this.liveChannel.output$.subscribe((translated) => this.translatedLive.set(translated));
  }
}
