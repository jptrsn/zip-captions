import { Component, Input, Renderer2, Signal, ViewChildren, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../models/app.model';
import { selectLineHeight, selectRenderHistoryLength, selectTextSize, selectTranslationSettings } from '../../../../selectors/settings.selector';
import { AvailableLineHeights, AvailableTextSizes, LineHeight, SettingsActions, TextSize, TranslationDisplayMode, TranslationSettings } from '../../../settings/models/settings.model';
import { selectIsBroadcasting } from '../../../../selectors/peer.selectors';
import { RecognitionActions } from '../../../../actions/recogntion.actions';
import { recognitionConnectedSelector } from '../../../../selectors/recognition.selector';
import { selectObsConnected } from '../../../../selectors/obs.selectors';
import { ObsConnectionState } from '../../../../reducers/obs.reducer';
import { ChromeTranslatorService } from '../../../../services/translator/chrome-translator.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-recognition-control-sidebar',
  templateUrl: './recognition-control-sidebar.component.html',
  styleUrls: ['./recognition-control-sidebar.component.scss'],
})
export class RecognitionControlSidebarComponent {
  @Input() showFullscreen = true;
  @Input() showTextFlow = true;
  @Input() showPip = true;
  @ViewChildren('details') subMenus!: HTMLElement[];
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
  public translationSettings: Signal<TranslationSettings | undefined>;
  public translationMode: Signal<TranslationDisplayMode>;

  private availableTextSizes = AvailableTextSizes;
  private availableLineHeights = AvailableLineHeights;

  constructor(private store: Store<AppState>,
              private renderer: Renderer2,
              private translatorService: ChromeTranslatorService) {
    this.isTranslatorSupported = this.translatorService.isSupported();
    this.translationSettings = toSignal(this.store.select(selectTranslationSettings));
    this.translationMode = computed(() => this.translationSettings()?.mode ?? 'off');

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
}
