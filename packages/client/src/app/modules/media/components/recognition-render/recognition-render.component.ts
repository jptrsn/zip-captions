import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, NgZone, OnDestroy, OnInit, Signal, ViewChild, WritableSignal, computed, effect, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Store, select } from '@ngrx/store';
import { fadeInOnEnterAnimation, slideInRightOnEnterAnimation, slideInUpOnEnterAnimation, slideOutDownOnLeaveAnimation, slideOutRightOnLeaveAnimation } from 'angular-animations';
import { Subject, map, takeUntil } from 'rxjs';
import { AppState } from '../../../../models/app.model';
import { CaptionSegment } from '../../../../models/caption-segment.model';
import { RecognitionState, RecognitionStatus } from '../../../../models/recognition.model';
import { windowControlsOverlaySelector } from '../../../../selectors/app.selector';
import { recognitionConnectedSelector, recognitionErrorSelector, recognitionIdSelector, recognitionPausedSelector, selectRecognition } from '../../../../selectors/recognition.selector';
import { dialectSelector, languageSelector, selectRenderHistoryLength, selectTextFlow, selectTranslationSettings } from '../../../../selectors/settings.selector';
import { FullScreenService } from '../../../../services/full-screen/full-screen.service';
import { DocumentPipService } from '../../../../services/document-pip/document-pip.service';
import { alignTranslations } from '../../../../services/translator/segment-translations';
import { CaptionTranslationService } from '../../../../services/translator/caption-translation.service';
import { textDirection } from '../../../../services/translator/text-direction';
import { ChromeTranslatorService, TranslationModelStatus } from '../../../../services/translator/chrome-translator.service';
import { CaptionLine, buildOriginalLines, buildTranslatedLines } from '../../../../services/translator/caption-lines';
import { CaptionView, resolveCaptionView, showPipFeedSwitch, splitPaneOrder } from '../../../../services/translator/caption-view';
import { AvailableTranslationLanguages, DefaultPaneOrder, DefaultPipContent, DefaultSplitOrientation, PaneOrder, PipContent, SettingsActions, SplitOrientation, SupportedTranslationLanguage, TextFlow, TranslationDisplayMode, TranslationSettings, isSpokenLanguage } from '../../../settings/models/settings.model';
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
  public captionView: Signal<CaptionView>;
  public splitOrientation: Signal<SplitOrientation>;
  public paneOrder: Signal<PaneOrder>;
  public pipContent: Signal<PipContent>;
  public showPipSwitch: Signal<boolean>;
  public panes: Signal<('original' | 'translated')[]>;
  public originalLines: Signal<CaptionLine[]>;
  public translatedLines: Signal<CaptionLine[]>;
  public targetLanguage: Signal<string>;
  public sourceLanguage: Signal<string>;
  public originalTextDir: Signal<'ltr' | 'rtl'>;
  public translatedTextDir: Signal<'ltr' | 'rtl'>;
  public availableLanguages: Signal<SupportedTranslationLanguage[]>;
  public translatedLiveText: Signal<string>;
  public translatedTextOutput: Signal<string[]>;
  public hasTranslatedResults: Signal<boolean>;
  public originalLanguageLabel: Signal<string>;
  public targetLanguageLabel: Signal<string>;
  public modelStatus: Signal<TranslationModelStatus>;
  public downloadProgress: Signal<number>;
  public controlsVisible: WritableSignal<boolean> = signal(true);
  public canSwap: Signal<boolean>;

  @ViewChild('enable') sidebarCheckbox!: ElementRef<HTMLInputElement>;
  @ViewChild('captionContainer') captionContainer!: ElementRef<HTMLElement>;

  private onDestroy$: Subject<void> = new Subject<void>();
  private segments: Signal<CaptionSegment[]>;
  private idleTimeoutId: any = null;
  private readonly IDLE_TIMEOUT_MS = 3500;

  constructor(private store: Store<AppState>,
              private el: ElementRef,
              private fullScreen: FullScreenService,
              private documentPip: DocumentPipService,
              private recognitionService: RecognitionService,
              private translatorService: ChromeTranslatorService,
              private captionTranslation: CaptionTranslationService,
              private ngZone: NgZone,
              private cd: ChangeDetectorRef) {
    this.isPipActive = this.documentPip.isPipActive;
    this.state = toSignal(this.store.select(selectRecognition));
    this.connected = toSignal(this.store.select(recognitionConnectedSelector));
    this.paused = toSignal(this.store.select(recognitionPausedSelector));
    const id: Signal<string | undefined> = toSignal(this.store.select(recognitionIdSelector));
    this.liveText = computed(() => id() ? this.recognitionService.getLiveOutput()() : '');
    this.textOutput = computed(() => id() ? this.recognitionService.getRecognizedText()() : []);
    this.segments = this.captionTranslation.segments;
    this.translatedLiveText = this.captionTranslation.translatedLive;
    this.translatedTextOutput = computed(() => alignTranslations(this.segments(), this.captionTranslation.translations()));
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
    this.captionView = computed(() => resolveCaptionView(
      this.translationMode(),
      this.isPipActive(),
      this.translationSettings()?.pipContent ?? DefaultPipContent));
    this.pipContent = computed(() => this.translationSettings()?.pipContent ?? DefaultPipContent);
    this.showPipSwitch = computed(() => showPipFeedSwitch(this.translationMode(), this.isPipActive()));
    this.splitOrientation = computed(() => this.translationSettings()?.splitOrientation ?? DefaultSplitOrientation);
    this.paneOrder = computed(() => this.translationSettings()?.paneOrder ?? DefaultPaneOrder);
    this.panes = computed(() => splitPaneOrder(this.paneOrder()));
    this.targetLanguage = computed(() => this.translationSettings()?.targetLanguage ?? 'es');

    const dialect = toSignal(this.store.select(dialectSelector));
    const lang = toSignal(this.store.select(languageSelector));
    this.sourceLanguage = computed(() => {
      const d = dialect();
      if (d && d !== 'unspecified') return d;
      return lang() || 'en';
    });

    // Pending segments have placeholder lines, so any segment counts as a result
    this.hasTranslatedResults = computed(() => {
      if (this.connected()) {
        return this.translatedLiveText() !== '' || this.segments().length > 0;
      }
      return false;
    });

    this.originalLines = computed(() => buildOriginalLines(this.segments(), this.sourceLanguage()));
    this.translatedLines = computed(() => buildTranslatedLines(this.segments(), this.captionTranslation.translations(), this.targetLanguage()));

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

    this.canSwap = computed(() => isSpokenLanguage(this.targetLanguage()));

    this.modelStatus = this.translatorService.modelStatus;
    this.downloadProgress = this.translatorService.downloadProgress;

    // The translations themselves come from CaptionTranslationService; this component only keeps the
    // model status (for the download button) up to date when the languages change
    toObservable(computed(() => `${this.sourceLanguage()}|${this.targetLanguage()}`)).pipe(
      takeUntil(this.onDestroy$)
    ).subscribe(() => {
      if (this.translatorService.isSupported()) {
        this.translatorService.checkModelStatus(this.sourceLanguage(), this.targetLanguage());
      }
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

  public setTargetLanguage(targetLanguage: string): void {
    this.store.dispatch(SettingsActions.setTranslationTargetLanguage({ targetLanguage }));
    if (this.translationMode() === 'off') {
      this.store.dispatch(SettingsActions.setTranslationMode({ mode: 'split' }));
      this.store.dispatch(SettingsActions.setTranslationEnabled({ enabled: true }));
    }
  }

  public swapLanguages(): void {
    this.store.dispatch(SettingsActions.swapTranslationLanguages());
  }

  /** Switches between stacked and side-by-side panes */
  public toggleOrientation(): void {
    this.store.dispatch(SettingsActions.setSplitOrientation({ orientation: this.splitOrientation() === 'vertical' ? 'horizontal' : 'vertical' }));
  }

  /** Exchanges which pane comes first; leaves the languages alone (unlike swapLanguages) */
  public swapPanes(): void {
    this.store.dispatch(SettingsActions.swapCaptionPanes());
  }

  /** Chooses what the Picture-in-Picture window shows; the sidebar isn't reachable from inside it */
  public setPipContent(content: PipContent): void {
    this.store.dispatch(SettingsActions.setPipContent({ content }));
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
