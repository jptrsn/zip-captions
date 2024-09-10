import { Component, Input, Renderer2, Signal, ViewChildren, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../models/app.model';
import { selectLineHeight, selectRenderHistoryLength, selectTextSize } from '../../../../selectors/settings.selector';
import { AvailableLineHeights, AvailableTextSizes, LineHeight, SettingsActions, TextSize } from '../../../settings/models/settings.model';
import { selectIsBroadcasting } from '../../../../selectors/peer.selectors';
import { RecognitionActions } from '../../../../actions/recogntion.actions';
import { recognitionConnectedSelector } from '../../../../selectors/recognition.selector';
import { selectObsConnected } from '../../../../selectors/obs.selectors';
import { ObsConnectionState } from '../../../../reducers/obs.reducer';
import { map } from 'rxjs';

@Component({
  selector: 'app-recognition-control-sidebar',
  templateUrl: './recognition-control-sidebar.component.html',
  styleUrls: ['./recognition-control-sidebar.component.scss'],
})
export class RecognitionControlSidebarComponent {
  @Input() showFullscreen = true;
  @Input() showTextFlow = true;
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

  private availableTextSizes = AvailableTextSizes;
  private availableLineHeights = AvailableLineHeights;

  constructor(private store: Store<AppState>,
              private renderer: Renderer2) {
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
