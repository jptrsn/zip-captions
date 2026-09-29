import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Signal, ViewChild, WritableSignal, computed, effect, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Store, select } from '@ngrx/store';
import { fadeInOnEnterAnimation, slideInRightOnEnterAnimation, slideInUpOnEnterAnimation, slideOutDownOnLeaveAnimation, slideOutRightOnLeaveAnimation } from 'angular-animations';
import { Subject, distinctUntilChanged, map, takeUntil } from 'rxjs';
import { AppState } from '../../../../models/app.model';
import { RecognitionState, RecognitionStatus } from '../../../../models/recognition.model';
import { windowControlsOverlaySelector } from '../../../../selectors/app.selector';
import { recognitionConnectedSelector, recognitionErrorSelector, recognitionIdSelector, recognitionPausedSelector, selectRecognition } from '../../../../selectors/recognition.selector';
import { dialectSelector, languageSelector, selectRenderHistoryLength, selectTextFlow, selectTranslationSettings } from '../../../../selectors/settings.selector';
import { FullScreenService } from '../../../../services/full-screen/full-screen.service';
import { DocumentPipService } from '../../../../services/document-pip/document-pip.service';
import { ChromeTranslatorService, SystemRequirementsStatus, TranslationModelStatus } from '../../../../services/translator/chrome-translator.service';
import { TextFlow, TranslationDisplayMode, TranslationSettings } from '../../../settings/models/settings.model';
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
  public targetLanguage: Signal<string>;
  public sourceLanguage: Signal<string>;
  public translatedLiveText: WritableSignal<string> = signal('');
  public translatedTextOutput: WritableSignal<string[]> = signal([]);
  public hasTranslatedResults: Signal<boolean>;
  public originalLanguageLabel: Signal<string>;
  public targetLanguageLabel: Signal<string>;
  public modelStatus: Signal<TranslationModelStatus>;
  public downloadProgress: Signal<number>;
  public systemRequirements: Signal<SystemRequirementsStatus>;

  @ViewChild('enable') sidebarCheckbox!: ElementRef<HTMLInputElement>;
  @ViewChild('captionContainer') captionContainer!: ElementRef<HTMLElement>;

  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private store: Store<AppState>,
              private el: ElementRef,
              private fullScreen: FullScreenService,
              private documentPip: DocumentPipService,
              private recognitionService: RecognitionService,
              private translatorService: ChromeTranslatorService) {
    this.isPipActive = this.documentPip.isPipActive;
    this.state = toSignal(this.store.select(selectRecognition));
    this.connected = toSignal(this.store.select(recognitionConnectedSelector));
    this.paused = toSignal(this.store.select(recognitionPausedSelector));
    const id: Signal<string | undefined> = toSignal(this.store.select(recognitionIdSelector));
    this.liveText = computed(() => id() ? this.recognitionService.getLiveOutput()() : '');
    this.textOutput = computed(() => id() ? this.recognitionService.getRecognizedText()() : []);
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
    this.translationMode = computed(() => this.translationSettings()?.mode ?? 'off');
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

    this.originalLanguageLabel = computed(() => {
      const s = this.sourceLanguage();
      return (s ? s.split('-')[0] : 'EN').toUpperCase();
    });

    this.targetLanguageLabel = computed(() => {
      const t = this.targetLanguage();
      return (t ? t.split('-')[0] : 'ES').toUpperCase();
    });

    this.modelStatus = this.translatorService.modelStatus;
    this.downloadProgress = this.translatorService.downloadProgress;
    this.systemRequirements = this.translatorService.systemRequirements;

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
        this.translatedLiveText.set('');
      }
    });

    // Handle finalized segment translations
    toObservable(this.textOutput).pipe(
      takeUntil(this.onDestroy$),
      distinctUntilChanged((p, c) => p.length === c.length && (p.length === 0 || p[p.length - 1] === c[c.length - 1]))
    ).subscribe((segments) => {
      const mode = this.translationMode();
      const src = this.sourceLanguage();
      const tgt = this.targetLanguage();

      if (mode !== 'off' && segments.length > 0 && this.translatorService.isSupported()) {
        this.translatorService.translateSegments(segments, src, tgt).then((translated) => {
          this.translatedTextOutput.set(translated);
        }).catch((err) => {
          console.warn('Segment translation failed:', err);
        });
      } else if (segments.length === 0) {
        this.translatedTextOutput.set([]);
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
        const segments = this.textOutput();
        if (segments.length > 0 && this.translatorService.isSupported()) {
          this.translatorService.translateSegments(segments, src, tgt).then((translated) => {
            this.translatedTextOutput.set(translated);
          }).catch((err) => {
            console.warn('Segment translation failed:', err);
          });
        }
      } else if (!settings?.enabled || settings?.mode === 'off') {
        this.translatedLiveText.set('');
        this.translatedTextOutput.set([]);
      }
    });

    // Automatically re-translate all segments when the on-device model finishes downloading
    this.translatorService.modelReady$.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe(() => {
      const segments = this.textOutput();
      const src = this.sourceLanguage();
      const tgt = this.targetLanguage();
      if (segments.length > 0 && this.translationMode() !== 'off') {
        this.translatorService.translateSegments(segments, src, tgt).then((translated) => {
          this.translatedTextOutput.set(translated);
        });
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
      this.translatedLiveText.set(translated);
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
    if (this.fullScreen.isAvailable) {
      this.fullScreen.registerElement(this.el);
    }
    if (this.translatorService.isSupported()) {
      this.translatorService.checkModelStatus(this.sourceLanguage(), this.targetLanguage());
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
