import { ChangeDetectorRef, Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild, WritableSignal, computed, effect, signal } from '@angular/core';
import { PeerService } from '../../services/peer.service';
import { Signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Store, select } from '@ngrx/store';
import { fadeInOnEnterAnimation, slideInRightOnEnterAnimation, slideInUpOnEnterAnimation, slideOutDownOnLeaveAnimation, slideOutRightOnLeaveAnimation } from 'angular-animations';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { AppState } from '../../../../models/app.model';
import { selectBroadcastPaused, selectHostOnline, selectPeerServerConnected } from '../../../../selectors/peer.selectors';
import { recognitionErrorSelector } from '../../../../selectors/recognition.selector';
import { dialectSelector, languageSelector, selectRenderHistoryLength, selectTextFlow, selectTranslationSettings } from '../../../../selectors/settings.selector';
import { FullScreenService } from '../../../../services/full-screen/full-screen.service';
import { textDirection } from '../../../../services/translator/text-direction';
import { ChromeTranslatorService, TranslationModelStatus } from '../../../../services/translator/chrome-translator.service';
import { AvailableTranslationLanguages, SettingsActions, SupportedTranslationLanguage, TextFlow, TranslationDisplayMode, TranslationSettings } from '../../../settings/models/settings.model';

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
  public textOutput: WritableSignal<string[]> = signal([]);
  public hasLiveResults: Signal<boolean>;
  public error: Signal<string | undefined>;
  public textFlowDown: Signal<boolean | undefined>;
  public renderHistory: Signal<number | undefined>;

  // Translation signals
  public isTranslatorSupported: boolean;
  public translationSettings: Signal<TranslationSettings | undefined>;
  public translationMode: Signal<TranslationDisplayMode>;
  public targetLanguage: Signal<string>;
  public sourceLanguage: Signal<string>;
  public originalTextDir: Signal<'ltr' | 'rtl'>;
  public translatedTextDir: Signal<'ltr' | 'rtl'>;
  public availableLanguages: Signal<SupportedTranslationLanguage[]>;
  public translatedLiveText: WritableSignal<string> = signal('');
  public translatedTextOutput: WritableSignal<string[]> = signal([]);
  public hasTranslatedResults: Signal<boolean>;
  public originalLanguageLabel: Signal<string>;
  public targetLanguageLabel: Signal<string>;
  public modelStatus: Signal<TranslationModelStatus>;
  public downloadProgress: Signal<number>;
  public controlsVisible: WritableSignal<boolean> = signal(true);

  @ViewChild('enable') sidebarCheckbox!: ElementRef<HTMLInputElement>;

  private sourceLanguage$: Observable<string>;
  private onDestroy$: Subject<void> = new Subject<void>();
  private idleTimeoutId: any = null;
  private readonly IDLE_TIMEOUT_MS = 3500;
  constructor(private store: Store<AppState>,
              private el: ElementRef,
              private fullScreen: FullScreenService,
              private peerService: PeerService,
              private cd: ChangeDetectorRef,
              private ngZone: NgZone,
              private translatorService: ChromeTranslatorService) {

    this.isTranslatorSupported = this.translatorService.isSupported();
    this.modelStatus = this.translatorService.modelStatus;
    this.downloadProgress = this.translatorService.downloadProgress;
    this.translationSettings = toSignal(this.store.select(selectTranslationSettings));
    this.translationMode = computed(() => this.isTranslatorSupported ? (this.translationSettings()?.mode ?? 'off') : 'off');
    this.targetLanguage = computed(() => this.translationSettings()?.targetLanguage ?? 'es');

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
    this.sourceLanguage$ = toObservable(this.sourceLanguage);

    this.availableLanguages = computed(() => {
      const srcCode = this.translatorService.normalizeLanguageCode(this.sourceLanguage());
      return AvailableTranslationLanguages.filter((l) => l.code !== srcCode);
    });

    this.hasTranslatedResults = computed(() => {
      return this.translatedLiveText() !== '' || this.translatedTextOutput().length > 0;
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
      if (this.translationMode() !== 'off' && text && this.isTranslatorSupported) {
        this.translatorService.queueLiveTranslation(text, this.sourceLanguage(), this.targetLanguage());
      } else if (!text) {
        this.ngZone.run(() => {
          this.translatedLiveText.set('');
          this.cd.detectChanges();
        });
      }
      this.cd.detectChanges();
    });

    this.peerService.textOutput$.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe((results) => {
      this.textOutput.set(results);
      if (this.translationMode() !== 'off' && results.length > 0 && this.isTranslatorSupported) {
        this.translatorService.translateSegments(results, this.sourceLanguage(), this.targetLanguage()).then((translated) => {
          this.ngZone.run(() => {
            this.translatedTextOutput.set(translated);
            this.cd.detectChanges();
          });
        }).catch((err) => {
          console.warn('Broadcast segment translation failed:', err);
        });
      } else if (results.length === 0) {
        this.ngZone.run(() => {
          this.translatedTextOutput.set([]);
          this.cd.detectChanges();
        });
      }
      this.cd.detectChanges();
    });

    // Re-translate when broadcast viewer changes translation settings
    this.store.select(selectTranslationSettings).pipe(
      takeUntil(this.onDestroy$)
    ).subscribe((settings) => {
      const targetLang = settings?.targetLanguage ?? 'es';
      if (this.isTranslatorSupported) {
        this.translatorService.checkModelStatus(this.sourceLanguage(), targetLang);
      }
      if (settings?.enabled && settings.mode !== 'off') {
        const segments = this.textOutput();
        if (segments.length > 0 && this.isTranslatorSupported) {
          this.translatorService.translateSegments(segments, this.sourceLanguage(), targetLang).then((translated) => {
            this.ngZone.run(() => {
              this.translatedTextOutput.set(translated);
              this.cd.detectChanges();
            });
          }).catch((err) => {
            console.warn('Broadcast segment translation failed:', err);
          });
        }
      } else if (!settings?.enabled || settings?.mode === 'off') {
        this.ngZone.run(() => {
          this.translatedLiveText.set('');
          this.translatedTextOutput.set([]);
          this.cd.detectChanges();
        });
      }
    });

    // Observe source language changes from host and update translation/avoid collision
    this.sourceLanguage$.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe((src) => {
      const srcCode = this.translatorService.normalizeLanguageCode(src);
      const tgtCode = this.translatorService.normalizeLanguageCode(this.targetLanguage());
      if (srcCode && tgtCode && srcCode === tgtCode) {
        const alt = srcCode === 'es' ? 'en' : 'es';
        this.store.dispatch(SettingsActions.setTranslationTargetLanguage({ targetLanguage: alt }));
      }
      if (this.isTranslatorSupported) {
        this.translatorService.checkModelStatus(src, this.targetLanguage());
      }
      if (this.translationMode() !== 'off') {
        const segments = this.textOutput();
        if (segments.length > 0 && this.isTranslatorSupported) {
          this.translatorService.translateSegments(segments, src, this.targetLanguage()).then((translated) => {
            this.ngZone.run(() => {
              this.translatedTextOutput.set(translated);
              this.cd.detectChanges();
            });
          }).catch((err) => {
            console.warn('Broadcast segment translation failed on source update:', err);
          });
        }
      }
    });

    // Automatically re-translate when the model finishes downloading
    this.translatorService.modelReady$.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe(() => {
      const segments = this.textOutput();
      if (segments.length > 0 && this.translationMode() !== 'off') {
        this.translatorService.translateSegments(segments, this.sourceLanguage(), this.targetLanguage()).then((translated) => {
          this.ngZone.run(() => {
            this.translatedTextOutput.set(translated);
            this.cd.detectChanges();
          });
        });
      }
      const live = this.liveText();
      if (live && this.translationMode() !== 'off') {
        this.translatorService.queueLiveTranslation(live, this.sourceLanguage(), this.targetLanguage());
      }
    });

    this.translatorService.liveOutput$.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe((translated) => {
      this.ngZone.run(() => {
        this.translatedLiveText.set(translated);
        this.cd.detectChanges();
      });
    });

    if (this.fullScreen.isAvailable) {
      this.fullScreen.registerElement(this.el);
    }
  }

  public setTargetLanguage(targetLanguage: string): void {
    this.store.dispatch(SettingsActions.setTranslationTargetLanguage({ targetLanguage }));
    if (this.translationMode() === 'off') {
      this.store.dispatch(SettingsActions.setTranslationMode({ mode: 'split' }));
      this.store.dispatch(SettingsActions.setTranslationEnabled({ enabled: true }));
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

  public downloadModel(): void {
    const src = this.sourceLanguage();
    const tgt = this.targetLanguage();
    this.translatorService.downloadModel(src, tgt);
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
  }

  updateDom(): void {
    this.cd.detectChanges()
  }
}
