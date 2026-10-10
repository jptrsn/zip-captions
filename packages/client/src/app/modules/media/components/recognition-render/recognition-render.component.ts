import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, NgZone, OnDestroy, OnInit, Signal, ViewChild, WritableSignal, computed, effect, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Store, select } from '@ngrx/store';
import { fadeInOnEnterAnimation, slideInRightOnEnterAnimation, slideInUpOnEnterAnimation, slideOutDownOnLeaveAnimation, slideOutRightOnLeaveAnimation } from 'angular-animations';
import { Subject, distinctUntilChanged, map, takeUntil } from 'rxjs';
import { AppState } from '../../../../models/app.model';
import { CaptionSegment } from '../../../../models/caption-segment.model';
import { RecognitionState, RecognitionStatus } from '../../../../models/recognition.model';
import { windowControlsOverlaySelector } from '../../../../selectors/app.selector';
import { recognitionConnectedSelector, recognitionErrorSelector, recognitionIdSelector, recognitionPausedSelector, selectRecognition } from '../../../../selectors/recognition.selector';
import { dialectSelector, languageSelector, selectRenderHistoryLength, selectTextFlow, selectTranslationSettings } from '../../../../selectors/settings.selector';
import { FullScreenService } from '../../../../services/full-screen/full-screen.service';
import { DocumentPipService } from '../../../../services/document-pip/document-pip.service';
import { alignTranslations, mergeTranslations } from '../../../../services/translator/segment-translations';
import { textDirection } from '../../../../services/translator/text-direction';
import { ChromeTranslatorService, TranslationModelStatus } from '../../../../services/translator/chrome-translator.service';
import { AvailableTranslationLanguages, SettingsActions, SupportedTranslationLanguage, TextFlow, TranslationDisplayMode, TranslationSettings } from '../../../settings/models/settings.model';
import { RecognitionService } from '../../services/recognition.service';

@Component({
  selector: 'app-recognition-render',
  templateUrl: './recognition-render.component.html',
  styleUrls: ['./recognition-render.component.scss'],
  animations: [
    slideInRightOnEnterAnimation(),
    slideInUpOnEnterAnimation(),
    slideOutDownOnLeaveAnimation(),
    slideOutRightOnLeaveAnimation(),
    fadeInOnEnterAnimation(),
  ]
})
export class RecognitionRenderComponent implements OnInit, AfterViewInit, OnDestroy {

  public state: Signal<RecognitionState | undefined>;
  public connected: Signal<boolean | undefined>;
  public paused: Signal<boolean | undefined>;
  public liveText: Signal<string>;
  public textOutput: Signal<string[]>;
  public hasLiveResults: Signal<boolean>;
  public error: Signal<string | undefined>;
  public textFlowDown: Signal<boolean | undefined>;
  public windowControlsOverlay: Signal<boolean | undefined>;
  public renderHistory: Signal<number | undefined>;
  public isPipActive: Signal<boolean>;

  // Translation signals
  public translationSettings: Signal<TranslationSettings | undefined>;
  public translationMode: Signal<TranslationDisplayMode>;
  public effectiveTranslationMode: Signal<TranslationDisplayMode>;
  public targetLanguage: Signal<string>;
  public sourceLanguage: Signal<string>;
  public originalTextDir: Signal<'ltr' | 'rtl'>;
  public translatedTextDir: Signal<'ltr' | 'rtl'>;
  public availableLanguages: Signal<SupportedTranslationLanguage[]>;
  public translatedLiveText: WritableSignal<string> = signal('');
  public translatedTextOutput: Signal<string[]>;
  public hasTranslatedResults: Signal<boolean>;
  public originalLanguageLabel: Signal<string>;
  public targetLanguageLabel: Signal<string>;
  public modelStatus: Signal<TranslationModelStatus>;
  public downloadProgress: Signal<number>;
  public controlsVisible: WritableSignal<boolean> = signal(true);

  @ViewChild('enable') sidebarCheckbox!: ElementRef<HTMLInputElement>;
  @ViewChild('captionContainer') captionContainer!: ElementRef<HTMLElement>;

  private onDestroy$: Subject<void> = new Subject<void>();
  private segments: Signal<CaptionSegment[]>;
  // Translations keyed by segment ID, for the current language pair
  private translationsById: WritableSignal<Map<string, string>> = signal(new Map());
  // Previous pair's translations, shown until re-translation lands so the pane doesn't blank
  private previousTranslationsById: WritableSignal<Map<string, string>> = signal(new Map());
  private requestedIds: Set<string> = new Set();
  // Incremented whenever translations are reset, so stale in-flight results are discarded
  private translationGeneration = 0;
  private idleTimeoutId: any = null;
  private readonly IDLE_TIMEOUT_MS = 3500;

  constructor(private store: Store<AppState>,
              private el: ElementRef,
              private fullScreen: FullScreenService,
              private documentPip: DocumentPipService,
              private recognitionService: RecognitionService,
              private translatorService: ChromeTranslatorService,
              private ngZone: NgZone,
              private cd: ChangeDetectorRef) {
    this.isPipActive = this.documentPip.isPipActive;
    this.state = toSignal(this.store.select(selectRecognition));
    this.connected = toSignal(this.store.select(recognitionConnectedSelector));
    this.paused = toSignal(this.store.select(recognitionPausedSelector));
    const id: Signal<string | undefined> = toSignal(this.store.select(recognitionIdSelector));
    this.liveText = computed(() => id() ? this.recognitionService.getLiveOutput()() : '');
    this.textOutput = computed(() => id() ? this.recognitionService.getRecognizedText()() : []);
    this.segments = computed(() => id() ? this.recognitionService.getRecognizedSegments()() : []);
    this.translatedTextOutput = computed(() => {
      const current = this.translationsById();
      const previous = this.previousTranslationsById();
      return alignTranslations(this.segments(), previous.size ? new Map([...previous, ...current]) : current);
    });
    this.hasLiveResults = computed(() => {
      if (this.connected()) {
        if (this.liveText() == '' && this.textOutput().length === 0) {
          return false;
        }
        return true;
      }
      return this.state()?.status != RecognitionStatus.uninitialized;
    });
    this.error = toSignal(this.store.select(recognitionErrorSelector));

    this.textFlowDown = toSignal(this.store.pipe(
      select(selectTextFlow),
      map((flow: TextFlow) => (flow === 'top-down'))));

    // Translation setup
    this.translationSettings = toSignal(this.store.select(selectTranslationSettings));
    const translatorSupported = this.translatorService.isSupported();
    this.translationMode = computed(() => translatorSupported ? (this.translationSettings()?.mode ?? 'off') : 'off');
    this.effectiveTranslationMode = computed(() => {
      const mode = this.translationMode();
      // When in Picture-in-Picture and translation is active (split or translated-only), show only translated captions
      if (this.isPipActive() && mode !== 'off') {
        return 'translated-only';
      }
      return mode;
    });
    this.targetLanguage = computed(() => this.translationSettings()?.targetLanguage ?? 'es');

    const dialect = toSignal(this.store.select(dialectSelector));
    const lang = toSignal(this.store.select(languageSelector));
    this.sourceLanguage = computed(() => {
      const d = dialect();
      if (d && d !== 'unspecified') return d;
      return lang() || 'en';
    });

    this.hasTranslatedResults = computed(() => {
      if (this.connected()) {
        return this.translatedLiveText() !== '' || this.translatedTextOutput().length > 0;
      }
      return false;
    });

    this.originalTextDir = computed(() => textDirection(this.sourceLanguage()));
    this.translatedTextDir = computed(() => textDirection(this.targetLanguage()));

    this.originalLanguageLabel = computed(() => {
      const s = this.sourceLanguage();
      return (s ? s.split('-')[0] : 'EN').toUpperCase();
    });

    this.targetLanguageLabel = computed(() => {
      const t = this.targetLanguage();
      return (t ? t.split('-')[0] : 'ES').toUpperCase();
    });

    this.availableLanguages = computed(() => {
      const srcCode = this.translatorService.normalizeLanguageCode(this.sourceLanguage());
      return AvailableTranslationLanguages.filter((l) => l.code !== srcCode);
    });

    this.modelStatus = this.translatorService.modelStatus;
    this.downloadProgress = this.translatorService.downloadProgress;

    // Handle live text translation
    toObservable(this.liveText).pipe(
      takeUntil(this.onDestroy$),
      distinctUntilChanged()
    ).subscribe((live) => {
      const mode = this.translationMode();
      const src = this.sourceLanguage();
      const tgt = this.targetLanguage();

      if (mode !== 'off' && live && this.translatorService.isSupported()) {
        this.translatorService.queueLiveTranslation(live, src, tgt);
      } else if (!live) {
        this.ngZone.run(() => {
          this.translatedLiveText.set('');
          this.cd.detectChanges();
        });
      }
    });

    // Handle finalized segment translations
    toObservable(this.segments).pipe(
      takeUntil(this.onDestroy$)
    ).subscribe((segments) => {
      if (this.translationMode() !== 'off' && segments.length > 0 && this.translatorService.isSupported()) {
        this.translatePendingSegments();
      } else if (segments.length === 0) {
        this.ngZone.run(() => {
          this.resetTranslations();
          this.cd.detectChanges();
        });
      }
    });

    // Re-translate when translation settings change
    toObservable(this.translationSettings).pipe(
      takeUntil(this.onDestroy$)
    ).subscribe((settings) => {
      const src = this.sourceLanguage();
      const tgt = this.targetLanguage();
      if (this.translatorService.isSupported()) {
        this.translatorService.checkModelStatus(src, tgt);
      }
      if (settings?.enabled && settings.mode !== 'off') {
        if (this.segments().length > 0 && this.translatorService.isSupported()) {
          this.translatePendingSegments(true);
        }
      } else if (!settings?.enabled || settings?.mode === 'off') {
        this.ngZone.run(() => {
          this.translatedLiveText.set('');
          this.resetTranslations();
          this.cd.detectChanges();
        });
      }
    });

    // Automatically re-translate all segments when the on-device model finishes downloading
    this.translatorService.modelReady$.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe(() => {
      const src = this.sourceLanguage();
      const tgt = this.targetLanguage();
      if (this.segments().length > 0 && this.translationMode() !== 'off') {
        this.translatePendingSegments(true);
      }
      const live = this.liveText();
      if (live && this.translationMode() !== 'off') {
        this.translatorService.queueLiveTranslation(live, src, tgt);
      }
    });

    // Subscribe to debounced live translation outputs
    this.translatorService.liveOutput$.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe((translated) => {
      this.ngZone.run(() => {
        this.translatedLiveText.set(translated);
        this.cd.detectChanges();
      });
    });

    if (this.fullScreen.isAvailable) {
      effect(() => {
        if (this.fullScreen.isFullscreen()) {
          this.sidebarCheckbox.nativeElement.checked = false;
        }
      })
    }

    if (this.documentPip.isSupported) {
      effect(() => {
        if (this.documentPip.isPipActive()) {
          this.sidebarCheckbox.nativeElement.checked = false;
        }
      })
    }

    this.windowControlsOverlay = toSignal(this.store.select(windowControlsOverlaySelector))
    this.renderHistory = toSignal(this.store.select(selectRenderHistoryLength))
  }

  ngOnInit(): void {
    this.onUserActivity();

    if (this.fullScreen.isAvailable) {
      this.fullScreen.registerElement(this.el);
    }
    if (this.translatorService.isSupported()) {
      this.translatorService.checkModelStatus(this.sourceLanguage(), this.targetLanguage());
    }
  }

  public onUserActivity(): void {
    if (!this.controlsVisible()) {
      this.controlsVisible.set(true);
    }
    if (this.idleTimeoutId) {
      clearTimeout(this.idleTimeoutId);
    }
    this.idleTimeoutId = setTimeout(() => {
      this.ngZone.run(() => {
        this.controlsVisible.set(false);
        this.cd.detectChanges();
      });
    }, this.IDLE_TIMEOUT_MS);
  }

  public onControlsFocus(): void {
    if (this.idleTimeoutId) {
      clearTimeout(this.idleTimeoutId);
      this.idleTimeoutId = null;
    }
    this.controlsVisible.set(true);
  }

  /**
   * Translates segments that have no translation yet and merges results by segment ID,
   * so a late result can never land on the wrong caption. `reset` re-translates everything
   * (language pair changed or a model became ready).
   */
  private translatePendingSegments(reset = false): void {
    if (reset) {
      const shown = new Map([...this.previousTranslationsById(), ...this.translationsById()]);
      this.resetTranslations();
      this.previousTranslationsById.set(shown);
    }
    const generation = this.translationGeneration;
    const known = this.translationsById();
    const pending = this.segments().filter((segment) => !known.has(segment.id) && !this.requestedIds.has(segment.id));
    if (pending.length === 0) return;
    pending.forEach((segment) => this.requestedIds.add(segment.id));

    this.translatorService.translateSegments(pending.map((segment) => segment.text), this.sourceLanguage(), this.targetLanguage()).then((translated) => {
      if (generation !== this.translationGeneration) return;
      const ids = pending.map((segment) => segment.id);
      ids.forEach((segmentId) => this.requestedIds.delete(segmentId));
      this.ngZone.run(() => {
        this.translationsById.update((current) => mergeTranslations(current, this.segments(), ids, translated));
        if (this.requestedIds.size === 0) {
          this.previousTranslationsById.set(new Map());
        }
        this.cd.detectChanges();
      });
    }).catch((err) => {
      pending.forEach((segment) => this.requestedIds.delete(segment.id));
      console.warn('Segment translation failed:', err);
    });
  }

  private resetTranslations(): void {
    this.translationGeneration++;
    this.requestedIds.clear();
    this.translationsById.set(new Map());
    this.previousTranslationsById.set(new Map());
  }

  public setTargetLanguage(targetLanguage: string): void {
    this.store.dispatch(SettingsActions.setTranslationTargetLanguage({ targetLanguage }));
    if (this.translationMode() === 'off') {
      this.store.dispatch(SettingsActions.setTranslationMode({ mode: 'split' }));
      this.store.dispatch(SettingsActions.setTranslationEnabled({ enabled: true }));
    }
  }

  public downloadModel(): void {
    const src = this.sourceLanguage();
    const tgt = this.targetLanguage();
    this.translatorService.downloadModel(src, tgt);
  }

  ngAfterViewInit(): void {
    if (this.documentPip.isSupported && this.captionContainer) {
      this.documentPip.registerElement(this.captionContainer);
    }
  }

  ngOnDestroy(): void {
    if (this.idleTimeoutId) {
      clearTimeout(this.idleTimeoutId);
    }
    this.onDestroy$.next();
    this.onDestroy$.complete();
    if (this.fullScreen.isAvailable) {
      this.fullScreen.deregisterElement();
    }
    if (this.documentPip.isSupported) {
      this.documentPip.deregisterElement();
    }
  }

  exitPip(): void {
    this.documentPip.close();
  }
}
