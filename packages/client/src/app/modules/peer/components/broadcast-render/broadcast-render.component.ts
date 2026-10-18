import { ChangeDetectorRef, Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild, WritableSignal, computed, effect, signal } from '@angular/core';
import { PeerService } from '../../services/peer.service';
import { Signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Store, select } from '@ngrx/store';
import { fadeInOnEnterAnimation, slideInRightOnEnterAnimation, slideInUpOnEnterAnimation, slideOutDownOnLeaveAnimation, slideOutRightOnLeaveAnimation } from 'angular-animations';
import { Subject, filter, map, take, takeUntil } from 'rxjs';
import { AppState } from '../../../../models/app.model';
import { selectBroadcastPaused, selectHostOnline, selectPeerServerConnected } from '../../../../selectors/peer.selectors';
import { recognitionErrorSelector } from '../../../../selectors/recognition.selector';
import { dialectSelector, languageSelector, selectRenderHistoryLength, selectTextFlow, selectTranslationSettings } from '../../../../selectors/settings.selector';
import { FullScreenService } from '../../../../services/full-screen/full-screen.service';
import { CaptionLine, buildOriginalLines, buildTranslatedLines } from '../../../../services/translator/caption-lines';
import { CaptionView, resolveCaptionView } from '../../../../services/translator/caption-view';
import { SegmentTranslationSession } from '../../../../services/translator/segment-translation-session';
import { SegmentTranslation } from '../../../../services/translator/segment-translations';
import { textDirection } from '../../../../services/translator/text-direction';
import { ViewerLanguageOptions, ViewerTranslationSource, coerceViewerTarget, resolveViewerTranslation, viewerLanguageOptions } from '../../../../services/translator/viewer-translation';
import { ChromeTranslatorService, LiveTranslationChannel, TranslationModelStatus } from '../../../../services/translator/chrome-translator.service';
import { AvailableTranslationLanguages, DefaultPaneOrder, DefaultSplitOrientation, PaneOrder, SettingsActions, SplitOrientation, TextFlow, TranslationDisplayMode, TranslationSettings } from '../../../settings/models/settings.model';

@Component({
  selector: 'app-broadcast-render',
  templateUrl: './broadcast-render.component.html',
  styleUrls: ['./broadcast-render.component.scss'],
  animations: [
    slideInRightOnEnterAnimation(),
    slideInUpOnEnterAnimation(),
    slideOutDownOnLeaveAnimation(),
    slideOutRightOnLeaveAnimation(),
    fadeInOnEnterAnimation()
  ],
})
export class BroadcastRenderComponent implements OnInit, OnDestroy {

  public connected: Signal<boolean | undefined>;
  public liveText: WritableSignal<string> = signal('');
  public textOutput: Signal<string[]>;
  public hasLiveResults: Signal<boolean>;
  public error: Signal<string | undefined>;
  public textFlowDown: Signal<boolean | undefined>;
  public renderHistory: Signal<number | undefined>;

  // Translation signals
  /** This viewer's own live-line translator, separate from the one for the local recognition feed */
  private liveChannel: LiveTranslationChannel;
  public isTranslatorSupported: boolean;
  public translationSettings: Signal<TranslationSettings | undefined>;
  public translationMode: Signal<TranslationDisplayMode>;
  public targetLanguage: Signal<string>;
  public sourceLanguage: Signal<string>;
  public originalTextDir: Signal<'ltr' | 'rtl'>;
  public translatedTextDir: Signal<'ltr' | 'rtl'>;
  public hasTranslatedResults: Signal<boolean>;
  public originalLanguageLabel: Signal<string>;
  public targetLanguageLabel: Signal<string>;
  public modelStatus: Signal<TranslationModelStatus>;
  public translationFailing: Signal<boolean>;
  /** The language of a broadcaster's translation that is offered but not shown, for the "show translation" button */
  public offeredTranslationHint!: Signal<string | undefined>;
  private viewerChoseLanguage = false;
  public downloadProgress: Signal<number>;
  public controlsVisible: WritableSignal<boolean> = signal(true);

  /** Languages the broadcaster translates into */
  public offeredLanguages: Signal<string[]>;
  /** Where the translated text comes from: the broadcaster, this device, or nowhere */
  public translationSource: Signal<ViewerTranslationSource>;
  /** True when this device can translate, or the broadcaster offers a language (the translation menu is useful) */
  public canTranslate: Signal<boolean>;
  public languageOptions: Signal<ViewerLanguageOptions>;
  public captionView: Signal<CaptionView>;
  public splitOrientation: Signal<SplitOrientation>;
  public paneOrder: Signal<PaneOrder>;
  public originalLines: Signal<CaptionLine[]>;
  public translatedLines: Signal<CaptionLine[]>;
  public translatedLiveText: Signal<string>;

  @ViewChild('enable') sidebarCheckbox!: ElementRef<HTMLInputElement>;

  private onDestroy$: Subject<void> = new Subject<void>();
  private idleTimeoutId: any = null;
  private readonly IDLE_TIMEOUT_MS = 1000;
  // Translates on this device, for languages the broadcaster doesn't send
  private localSession: SegmentTranslationSession;
  private localLiveText: WritableSignal<string> = signal('');

  constructor(private store: Store<AppState>,
              private el: ElementRef,
              private fullScreen: FullScreenService,
              private peerService: PeerService,
              private cd: ChangeDetectorRef,
              private ngZone: NgZone,
              private translatorService: ChromeTranslatorService) {

    this.liveChannel = this.translatorService.createLiveChannel();
    this.isTranslatorSupported = this.translatorService.isSupported();
    this.modelStatus = this.translatorService.modelStatus;
    this.translationFailing = this.translatorService.translationFailing;
    this.downloadProgress = this.translatorService.downloadProgress;
    this.localSession = new SegmentTranslationSession((texts, source, target) => this.translatorService.translateSegmentsStrict(texts, source, target));

    this.translationSettings = toSignal(this.store.select(selectTranslationSettings));
    this.targetLanguage = computed(() => this.translationSettings()?.targetLanguage ?? 'es');
    this.splitOrientation = computed(() => this.translationSettings()?.splitOrientation ?? DefaultSplitOrientation);
    this.paneOrder = computed(() => this.translationSettings()?.paneOrder ?? DefaultPaneOrder);

    const hostLang = toSignal(this.peerService.hostLanguage$);
    const dialect = toSignal(this.store.select(dialectSelector));
    const lang = toSignal(this.store.select(languageSelector));
    this.sourceLanguage = computed(() => {
      const hl = hostLang();
      if (hl) return hl;
      const d = dialect();
      if (d && d !== 'unspecified') return d;
      return lang() || 'en';
    });

    const segments = toSignal(this.peerService.segments$, { initialValue: [] });
    this.textOutput = computed(() => segments().map((segment) => segment.text));
    const broadcasterTranslations = toSignal(this.peerService.broadcasterTranslations$, { initialValue: [] });
    const broadcasterLive = toSignal(this.peerService.translatedLiveText$, { initialValue: '' });
    this.offeredLanguages = toSignal(this.peerService.offeredLanguages$, { initialValue: [] });

    this.translationSource = computed(() => resolveViewerTranslation(this.targetLanguage(), this.offeredLanguages(), this.isTranslatorSupported));
    this.canTranslate = computed(() => this.isTranslatorSupported || this.offeredLanguages().length > 0);
    // Translation shows only when there is a source for the chosen language
    this.translationMode = computed(() => this.translationSource() === 'none' ? 'off' : (this.translationSettings()?.mode ?? 'off'));
    this.captionView = computed(() => resolveCaptionView(this.translationMode(), false, 'translated'));
    this.languageOptions = computed(() => viewerLanguageOptions(AvailableTranslationLanguages, this.offeredLanguages(), this.sourceLanguage(), this.isTranslatorSupported));

    // The broadcaster's translations by segment ID, or this device's own
    const translations = computed((): Map<string, SegmentTranslation> => {
      switch (this.translationSource()) {
        case 'broadcaster':
          return new Map(broadcasterTranslations().map((t) => [t.id, { lang: t.lang, text: t.text }]));
        case 'local':
          return this.localSession.translations();
        default:
          return new Map();
      }
    });
    this.translatedLiveText = computed(() => this.translationSource() === 'broadcaster' ? broadcasterLive() : this.localLiveText());

    this.originalLines = computed(() => buildOriginalLines(segments(), this.sourceLanguage()));
    this.translatedLines = computed(() => buildTranslatedLines(segments(), translations(), this.targetLanguage()));

    this.hasTranslatedResults = computed(() => this.translatedLiveText() !== '' || segments().length > 0);

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

    const peerConnected = toSignal(this.store.select(selectPeerServerConnected));
    const hostOnline = toSignal(this.store.select(selectHostOnline));
    this.connected = computed(() => (peerConnected() && hostOnline()));

    this.error = toSignal(this.store.select(recognitionErrorSelector));

    this.textFlowDown = toSignal(this.store.pipe(
      select(selectTextFlow),
      map((flow: TextFlow) => (flow === 'top-down'))));

    this.hasLiveResults = computed(() => {
      if (this.liveText() == '' && this.textOutput().length === 0) {
        return false;
      }
      return true;
    });

    if (this.fullScreen.isAvailable) {
      effect(() => {
        if (this.fullScreen.isFullscreen()) {
          this.sidebarCheckbox.nativeElement.checked = false;
        }
        this.cd.detectChanges();
      })
    }

    this.renderHistory = toSignal(this.store.select(selectRenderHistoryLength))

    // A viewer who can't translate and picked a language the broadcaster doesn't send moves to one it does
    toObservable(computed(() => coerceViewerTarget(this.targetLanguage(), this.offeredLanguages(), this.isTranslatorSupported))).pipe(
      takeUntil(this.onDestroy$)
    ).subscribe((replacement) => {
      if (replacement) {
        this.store.dispatch(SettingsActions.setTranslationTargetLanguage({ targetLanguage: replacement }));
      }
    });

    // A broadcaster's translation is what a viewer starts on (no download, no waiting). Once per visit, and
    // not once the viewer has picked a language themselves.
    toObservable(this.offeredLanguages).pipe(
      filter((offered) => offered.length > 0),
      take(1),
      takeUntil(this.onDestroy$)
    ).subscribe((offered) => {
      const offeredBase = offered.map((code) => code.split('-')[0].toLowerCase());
      if (!this.viewerChoseLanguage && !offeredBase.includes(this.targetLanguage().split('-')[0].toLowerCase())) {
        this.store.dispatch(SettingsActions.setTranslationTargetLanguage({ targetLanguage: offeredBase[0] }));
      }
    });

    // A translation exists but is not shown: the viewer needs something on screen that says so
    this.offeredTranslationHint = computed(() => {
      const offered = this.offeredLanguages();
      return offered.length > 0 && this.translationMode() === 'off' ? offered[0].split('-')[0].toUpperCase() : undefined;
    });

    // Check the model for the language pair this viewer would translate on their own device.
    // Created here, not in ngOnInit: toObservable needs an injection context (Angular 16).
    toObservable(computed(() => `${this.sourceLanguage()}|${this.targetLanguage()}`)).pipe(
      takeUntil(this.onDestroy$)
    ).subscribe(() => {
      if (this.isTranslatorSupported) {
        this.translatorService.checkModelStatus(this.sourceLanguage(), this.targetLanguage());
      }
    });

    // Translate on this device only for languages the broadcaster doesn't send
    const localKey = computed(() => `${this.translationSource() === 'local' && this.translationMode() !== 'off'}|${this.targetLanguage()}`);
    toObservable(localKey).pipe(
      takeUntil(this.onDestroy$)
    ).subscribe(() => {
      if (this.isLocalTranslation()) {
        this.localSession.update(segments(), this.targetLanguage(), true);
      } else {
        this.localSession.reset();
        this.localLiveText.set('');
      }
    });
    toObservable(segments).pipe(
      takeUntil(this.onDestroy$)
    ).subscribe((current) => {
      if (this.isLocalTranslation() && current.length > 0) {
        this.localSession.update(current, this.targetLanguage());
      } else if (current.length === 0) {
        this.localSession.reset();
      }
    });
  }

  ngOnInit(): void {
    this.onUserActivity();

    if (this.isTranslatorSupported) {
      this.translatorService.checkModelStatus(this.sourceLanguage(), this.targetLanguage());
    }

    this.peerService.liveText$.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe((text) => {
      this.liveText.set(text);
      if (this.isLocalTranslation() && text) {
        this.liveChannel.queue(text, this.sourceLanguage(), this.targetLanguage());
      } else if (!text) {
        this.liveChannel.cancel();
        this.localLiveText.set('');
      }
      this.cd.detectChanges();
    });

    // Avoid translating into the host's own language
    this.peerService.hostLanguage$.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe(() => {
      const srcCode = this.translatorService.normalizeLanguageCode(this.sourceLanguage());
      const tgtCode = this.translatorService.normalizeLanguageCode(this.targetLanguage());
      if (srcCode && tgtCode && srcCode === tgtCode) {
        const alt = srcCode === 'es' ? 'en' : 'es';
        this.store.dispatch(SettingsActions.setTranslationTargetLanguage({ targetLanguage: alt }));
      }
    });

    // Automatically re-translate when the model finishes downloading
    this.translatorService.modelReady$.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe(() => {
      if (!this.isLocalTranslation()) return;
      this.localSession.update(this.peerService.segments$.value, this.targetLanguage(), true);
      const live = this.liveText();
      if (live) {
        this.liveChannel.queue(live, this.sourceLanguage(), this.targetLanguage(), true);
      }
    });

    this.liveChannel.output$.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe((translated) => {
      this.ngZone.run(() => {
        this.localLiveText.set(translated);
        this.cd.detectChanges();
      });
    });

    if (this.fullScreen.isAvailable) {
      this.fullScreen.registerElement(this.el);
    }
  }

  private isLocalTranslation(): boolean {
    return this.translationSource() === 'local' && this.translationMode() !== 'off';
  }

  /** Shows the translation the broadcaster offers, as a second pane */
  public showOfferedTranslation(): void {
    const offered = this.offeredLanguages()[0];
    if (offered) {
      this.setTargetLanguage(offered.split('-')[0].toLowerCase());
    }
  }

  public setTargetLanguage(targetLanguage: string): void {
    this.viewerChoseLanguage = true;
    this.store.dispatch(SettingsActions.setTranslationTargetLanguage({ targetLanguage }));
    if (this.translationMode() === 'off') {
      this.store.dispatch(SettingsActions.setTranslationMode({ mode: 'split' }));
      this.store.dispatch(SettingsActions.setTranslationEnabled({ enabled: true }));
    }
  }

  public toggleOrientation(): void {
    this.store.dispatch(SettingsActions.setSplitOrientation({ orientation: this.splitOrientation() === 'vertical' ? 'horizontal' : 'vertical' }));
  }

  public swapPanes(): void {
    this.store.dispatch(SettingsActions.swapCaptionPanes());
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

  /** Set synchronously by the click, so the button shows it was received before the service reports progress */
  public downloadRequested: WritableSignal<boolean> = signal(false);

  public downloadModel(): void {
    if (this.downloadRequested()) return;
    this.downloadRequested.set(true);
    const src = this.sourceLanguage();
    const tgt = this.targetLanguage();
    this.translatorService.downloadModel(src, tgt).finally(() => this.downloadRequested.set(false));
  }

  ngOnDestroy(): void {
    if (this.idleTimeoutId) {
      clearTimeout(this.idleTimeoutId);
    }
    if (this.fullScreen.isAvailable) {
      this.fullScreen.deregisterElement();
      this.store.select(selectBroadcastPaused).pipe(
        takeUntil(this.onDestroy$)
      ).subscribe(() => {
        console.log('pause changed');
        this.cd.detectChanges();
      })
    }
    this.onDestroy$.next();
    this.translatorService.clearSessionCache();
  }

  updateDom(): void {
    this.cd.detectChanges()
  }
}
