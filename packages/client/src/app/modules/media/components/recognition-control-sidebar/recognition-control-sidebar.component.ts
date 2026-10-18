import { AfterViewInit, Component, ElementRef, Input, OnDestroy, Renderer2, Signal, ViewChildren, computed, inject } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../models/app.model';
import { dialectSelector, languageSelector, selectLineHeight, selectRenderHistoryLength, selectTextSize, selectTranslationSettings } from '../../../../selectors/settings.selector';
import { DocumentPipService } from '../../../../services/document-pip/document-pip.service';
import { AvailableLineHeights, AvailableTextSizes, AvailableTranslationLanguages, DefaultPipContent, DefaultSplitOrientation, LineHeight, PipContent, SettingsActions, SplitOrientation, SupportedTranslationLanguage, TextSize, TranslationDisplayMode, TranslationSettings, isSpokenLanguage } from '../../../settings/models/settings.model';
import { selectIsBroadcasting } from '../../../../selectors/peer.selectors';
import { RecognitionActions } from '../../../../actions/recogntion.actions';
import { recognitionConnectedSelector } from '../../../../selectors/recognition.selector';
import { selectObsConnected } from '../../../../selectors/obs.selectors';
import { ObsConnectionState } from '../../../../reducers/obs.reducer';
import { ChromeTranslatorService } from '../../../../services/translator/chrome-translator.service';
import { ViewerLanguageOptions, viewerLanguageOptions } from '../../../../services/translator/viewer-translation';
import { PeerService } from '../../../peer/services/peer.service';
import { Subject, map, takeUntil } from 'rxjs';

@Component({
  selector: 'app-recognition-control-sidebar',
  templateUrl: './recognition-control-sidebar.component.html',
  styleUrls: ['./recognition-control-sidebar.component.scss'],
})
export class RecognitionControlSidebarComponent implements AfterViewInit, OnDestroy {
  @Input() showFullscreen = true;
  @Input() showTextFlow = true;
  @Input() showPip = true;
  @Input() showRecognitionToggle = true;
  @ViewChildren('details') subMenus!: HTMLElement[];
  private host: ElementRef<HTMLElement> = inject(ElementRef);
  private visibilityObserver?: IntersectionObserver;
  public textSize: Signal<TextSize>;
  public textSizeMax: Signal<boolean>;
  public textSizeMin: Signal<boolean>;

  public lineHeight: Signal<LineHeight>;
  public lineHeightMin: Signal<boolean>;
  public lineHeightMax: Signal<boolean>;

  public isBroadcasting: Signal<boolean | undefined>;
  public isObsStreaming: Signal<boolean | undefined>;
  public recognitionActive: Signal<boolean | undefined>;

  public renderHistoryLength: Signal<number>;
  public renderHistoryMin: Signal<boolean>;
  public renderHistoryMax: Signal<boolean>;

  // Translation signals
  public isTranslatorSupported: boolean;
  public offeredLanguages: Signal<string[]>;
  public translationAvailable: Signal<boolean>;
  public languageOptions: Signal<ViewerLanguageOptions>;
  public translationSettings: Signal<TranslationSettings | undefined>;
  public translationMode: Signal<TranslationDisplayMode>;
  public targetLanguage: Signal<string>;
  public availableLanguages: Signal<SupportedTranslationLanguage[]>;
  // Viewers of a broadcast don't control the spoken language
  public showSwap: Signal<boolean>;
  public canSwap: Signal<boolean>;
  public splitOrientation: Signal<SplitOrientation>;
  public pipContent: Signal<PipContent>;
  public pipSupported: boolean;

  private availableTextSizes = AvailableTextSizes;
  private availableLineHeights = AvailableLineHeights;
  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private store: Store<AppState>,
              private renderer: Renderer2,
              private translatorService: ChromeTranslatorService,
              private peerService: PeerService,
              private documentPip: DocumentPipService) {
    this.isTranslatorSupported = this.translatorService.isSupported();
    this.offeredLanguages = toSignal(this.peerService.offeredLanguages$, { initialValue: [] });
    // A viewer whose device can't translate can still show the broadcaster's translation
    this.translationAvailable = computed(() => this.isTranslatorSupported || this.offeredLanguages().length > 0);
    this.translationSettings = toSignal(this.store.select(selectTranslationSettings));
    this.translationMode = computed(() => this.translationAvailable() ? (this.translationSettings()?.mode ?? 'off') : 'off');

    const hostLang = toSignal(this.peerService.hostLanguage$);
    const dialect = toSignal(this.store.select(dialectSelector));
    const lang = toSignal(this.store.select(languageSelector));
    const sourceLanguageCode = computed(() => {
      const hl = hostLang();
      if (hl) return this.translatorService.normalizeLanguageCode(hl);
      const d = dialect();
      if (d && d !== 'unspecified') return this.translatorService.normalizeLanguageCode(d);
      return this.translatorService.normalizeLanguageCode(lang());
    });

    this.availableLanguages = computed(() => {
      const src = sourceLanguageCode();
      return AvailableTranslationLanguages.filter((l) => l.code !== src);
    });
    // The broadcaster's languages first, then those this device can translate into
    this.languageOptions = computed(() => viewerLanguageOptions(AvailableTranslationLanguages, this.offeredLanguages(), sourceLanguageCode(), this.isTranslatorSupported));

    this.targetLanguage = computed(() => {
      return this.translationSettings()?.targetLanguage ?? (sourceLanguageCode() === 'es' ? 'en' : 'es');
    });

    this.splitOrientation = computed(() => this.translationSettings()?.splitOrientation ?? DefaultSplitOrientation);
    this.pipContent = computed(() => this.translationSettings()?.pipContent ?? DefaultPipContent);
    this.pipSupported = this.documentPip.isSupported;

    this.showSwap = computed(() => !hostLang());
    this.canSwap = computed(() => isSpokenLanguage(this.targetLanguage()));

    toObservable(sourceLanguageCode).pipe(
      takeUntil(this.onDestroy$)
    ).subscribe((src) => {
      const currentTgt = this.translationSettings()?.targetLanguage;
      if (currentTgt === src) {
        const alt = src === 'es' ? 'en' : 'es';
        this.store.dispatch(SettingsActions.setTranslationTargetLanguage({ targetLanguage: alt }));
      }
    });

    this.textSize = toSignal(this.store.select(selectTextSize)) as Signal<TextSize>;
    this.textSizeMax = computed(() => this.textSize() === this.availableTextSizes[this.availableTextSizes.length - 1]);
    this.textSizeMin = computed(() => this.textSize() === this.availableTextSizes[0]);

    this.lineHeight = toSignal(this.store.select(selectLineHeight)) as Signal<LineHeight>;
    this.lineHeightMax = computed(() => this.lineHeight() === this.availableLineHeights[this.availableLineHeights.length - 1]);
    this.lineHeightMin = computed(() => this.lineHeight() === this.availableLineHeights[0]);

    this.isBroadcasting = toSignal(this.store.select(selectIsBroadcasting));
    this.recognitionActive = toSignal(this.store.select(recognitionConnectedSelector));

    this.isObsStreaming = toSignal(this.store.pipe(select(selectObsConnected), map((state) => (state === ObsConnectionState.connected))));

    this.renderHistoryLength = toSignal(this.store.select(selectRenderHistoryLength)) as Signal<number>;
    this.renderHistoryMin = computed(() => this.renderHistoryLength() < 1);
    this.renderHistoryMax = computed(() => this.renderHistoryLength() > 24);
  }

  setTranslationMode(mode: TranslationDisplayMode): void {
    this.store.dispatch(SettingsActions.setTranslationMode({ mode }));
    this.store.dispatch(SettingsActions.setTranslationEnabled({ enabled: mode !== 'off' }));
  }

  swapLanguages(): void {
    this.store.dispatch(SettingsActions.swapTranslationLanguages());
  }

  toggleOrientation(): void {
    this.store.dispatch(SettingsActions.setSplitOrientation({ orientation: this.splitOrientation() === 'vertical' ? 'horizontal' : 'vertical' }));
  }

  /** Exchanges which pane is first; unlike swapLanguages it changes no language */
  swapPanes(): void {
    this.store.dispatch(SettingsActions.swapCaptionPanes());
  }

  setPipContent(content: PipContent): void {
    this.store.dispatch(SettingsActions.setPipContent({ content }));
  }

  setTargetLanguage(targetLanguage: string): void {
    this.store.dispatch(SettingsActions.setTranslationTargetLanguage({ targetLanguage }));
    if (this.translationMode() === 'off') {
      this.setTranslationMode('split');
    }
  }

  onTargetLanguageSelect(event: Event): void {
    const value = (event.target as HTMLSelectElement)?.value;
    if (value) {
      this.setTargetLanguage(value);
    }
  }

  cycleTranslationMode(): void {
    const current = this.translationMode();
    let next: TranslationDisplayMode = 'split';
    if (current === 'split') next = 'translated-only';
    else if (current === 'translated-only') next = 'off';
    else next = 'split';
    this.setTranslationMode(next);
  }


  hideElements(elements: HTMLElement[]) {
    for (const el of elements) {
      this.renderer.removeAttribute(el, 'open');
    }
  }

  increaseTextSize(): void {
    if (!this.textSizeMax()) {
      const idx = this.availableTextSizes.findIndex((size: TextSize) => size === this.textSize());
      this.store.dispatch(SettingsActions.setTextSize({size: this.availableTextSizes[idx+1]}));
    }
  }

  decreaseTextSize(): void {
    if (!this.textSizeMin()) {
      const idx = this.availableTextSizes.findIndex((size: TextSize) => size === this.textSize());
      this.store.dispatch(SettingsActions.setTextSize({size: this.availableTextSizes[idx-1]}));
    }
  }

  increaseLineHeight(): void {
    if (!this.lineHeightMax()) {
      const idx = this.availableLineHeights.findIndex((height: LineHeight) => height === this.lineHeight());
      this.store.dispatch(SettingsActions.setLineHeight({height: this.availableLineHeights[idx+1]}));
    }
  }

  decreaseLineHeight(): void {
    if (!this.lineHeightMin()) {
      const idx = this.availableLineHeights.findIndex((height: LineHeight) => height === this.lineHeight());
      this.store.dispatch(SettingsActions.setLineHeight({height: this.availableLineHeights[idx-1]}));
    }
  }

  increaseRenderHistory(): void {
    if (!this.renderHistoryMax()) {
      const count = (this.renderHistoryLength() || 0) + 1;
      this.store.dispatch(SettingsActions.setRenderHistory({count}))
    }
  }

  decreaseRenderHistory(): void {
    if (!this.renderHistoryMin()) {
      const count = this.renderHistoryLength() - 1;
      this.store.dispatch(SettingsActions.setRenderHistory({count}))
    }
  }

  toggleRecognition(): void {
    if (this.recognitionActive()) {
      this._pauseRecognition();
    } else {
      this._resumeRecognition();
    }

  }

  private _pauseRecognition(): void {
    this.store.dispatch(RecognitionActions.pause());
  }

  private _resumeRecognition(): void {
    this.store.dispatch(RecognitionActions.resume());
  }

  /**
   * The menus are <details> pop-ups that open onto the page. Nothing closed them when the drawer slid away,
   * leaving a pop-up that covered the drawer's trigger. The drawer is closed by a click on its overlay or by
   * code, so watching for the sidebar leaving the viewport covers every host.
   */
  ngAfterViewInit(): void {
    if (typeof IntersectionObserver === 'undefined') return;
    this.visibilityObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => !entry.isIntersecting)) this.closeMenus();
    });
    // The host element is inline, so its own box says nothing about where the drawer is
    this.visibilityObserver.observe(this.host.nativeElement.firstElementChild ?? this.host.nativeElement);
  }

  public closeMenus(): void {
    const open: HTMLElement[] = Array.from(this.host.nativeElement.querySelectorAll('details[open]'));
    this.hideElements(open);
  }

  ngOnDestroy(): void {
    this.visibilityObserver?.disconnect();
    this.onDestroy$.next();
  }
}
