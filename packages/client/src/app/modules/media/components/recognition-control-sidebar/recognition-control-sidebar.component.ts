import { Component, Input, Renderer2, Signal, ViewChildren, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../models/app.model';
import { selectLineHeight, selectRenderHistoryLength, selectTextFlow, selectTextSize } from '../../../../selectors/settings.selector';
import { AvailableLineHeights, AvailableTextSizes, LineHeight, SettingsActions, ShortcutActionId, TextFlow, TextSize } from '../../../settings/models/settings.model';
import { selectIsBroadcasting } from '../../../../selectors/peer.selectors';
import { RecognitionActions } from '../../../../actions/recogntion.actions';
import { recognitionConnectedSelector, recognitionPausedSelector } from '../../../../selectors/recognition.selector';
import { selectObsConnected } from '../../../../selectors/obs.selectors';
import { ObsConnectionState } from '../../../../reducers/obs.reducer';
import { map } from 'rxjs';
import { KeyboardShortcutsService } from '../../../../services/keyboard-shortcuts/keyboard-shortcuts.service';
import { FullScreenService } from '../../../../services/full-screen/full-screen.service';
import { DocumentPipService } from '../../../../services/document-pip/document-pip.service';

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
  public recognitionPaused: Signal<boolean | undefined>;

  public renderHistoryLength: Signal<number>;
  public renderHistoryMin: Signal<boolean>;
  public renderHistoryMax: Signal<boolean>;

  public textFlow: Signal<TextFlow>;

  private availableTextSizes = AvailableTextSizes;
  private availableLineHeights = AvailableLineHeights;

  constructor(private store: Store<AppState>,
              private renderer: Renderer2,
              private shortcutsService: KeyboardShortcutsService,
              private fullScreenService: FullScreenService,
              private documentPipService: DocumentPipService) {
    this.textSize = toSignal(this.store.select(selectTextSize)) as Signal<TextSize>;
    this.textSizeMax = computed(() => this.textSize() === this.availableTextSizes[this.availableTextSizes.length - 1]);
    this.textSizeMin = computed(() => this.textSize() === this.availableTextSizes[0]);

    this.lineHeight = toSignal(this.store.select(selectLineHeight)) as Signal<LineHeight>;
    this.lineHeightMax = computed(() => this.lineHeight() === this.availableLineHeights[this.availableLineHeights.length - 1]);
    this.lineHeightMin = computed(() => this.lineHeight() === this.availableLineHeights[0]);

    this.isBroadcasting = toSignal(this.store.select(selectIsBroadcasting));
    this.recognitionActive = toSignal(this.store.select(recognitionConnectedSelector));
    this.recognitionPaused = toSignal(this.store.select(recognitionPausedSelector));

    this.isObsStreaming = toSignal(this.store.pipe(select(selectObsConnected), map((state) => (state === ObsConnectionState.connected))));

    this.renderHistoryLength = toSignal(this.store.select(selectRenderHistoryLength)) as Signal<number>;
    this.renderHistoryMin = computed(() => this.renderHistoryLength() < 1);
    this.renderHistoryMax = computed(() => this.renderHistoryLength() > 24);

    this.textFlow = toSignal(this.store.select(selectTextFlow)) as Signal<TextFlow>;
  }

  formatShortcut(actionId: ShortcutActionId): string {
    return this.shortcutsService.formatShortcut(actionId);
  }

  formatPairShortcut(action1: ShortcutActionId, action2: ShortcutActionId): string {
    return this.shortcutsService.formatPairShortcut(action1, action2);
  }

  hideElements(elements: HTMLElement[]) {
    for (const el of elements) {
      this.renderer.removeAttribute(el, 'open');
    }
  }

  increaseTextSize(): void {
    this.shortcutsService.increaseTextSize();
  }

  decreaseTextSize(): void {
    this.shortcutsService.decreaseTextSize();
  }

  increaseLineHeight(): void {
    this.shortcutsService.increaseLineHeight();
  }

  decreaseLineHeight(): void {
    this.shortcutsService.decreaseLineHeight();
  }

  increaseRenderHistory(): void {
    this.shortcutsService.increaseRenderHistory();
  }

  decreaseRenderHistory(): void {
    this.shortcutsService.decreaseRenderHistory();
  }

  toggleTextFlow(): void {
    if (this.showTextFlow) {
      this.shortcutsService.toggleTextFlow();
    }
  }

  toggleFullscreen(): void {
    if (this.showFullscreen && this.fullScreenService.isAvailable) {
      this.shortcutsService.toggleFullscreen();
    }
  }

  togglePip(): void {
    if (this.showPip && this.documentPipService.isSupported) {
      this.shortcutsService.togglePip();
    }
  }

  toggleRecognition(): void {
    this.shortcutsService.toggleRecognition();
  }

  clearScreen(): void {
    this.shortcutsService.clearScreen();
  }
}
