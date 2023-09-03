import { Component, Input, Signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store, select } from '@ngrx/store';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { map } from 'rxjs';
import { AppState } from '../../../../models/app.model';
import { selectBroadcastPaused } from '../../../../selectors/peer.selectors';
import { recognitionPausedSelector } from '../../../../selectors/recognition.selector';
import { selectLineHeight, selectTextFlow, selectTextSize } from '../../../../selectors/settings.selector';
import { LineHeight, TextFlow, TextSize } from '../../../settings/models/settings.model';

@Component({
  selector: 'app-recognized-text',
  templateUrl: './recognized-text.component.html',
  styleUrls: ['./recognized-text.component.scss'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation(),
  ]
})
export class RecognizedTextComponent {
  @Input({ required: true}) connected!: Signal<boolean | undefined>;
  @Input({ required: true}) hasLiveResults!: Signal<boolean>;
  @Input({ required: true}) textOutput!: Signal<string[]>;
  @Input({ required: true}) error!: Signal<string | undefined>;
  @Input() hintText = 'HINTS.beginSpeaking';
  
  public classList: Signal<string>;
  public isPaused: Signal<boolean | undefined>;
  public textFlowDown: Signal<boolean | undefined>;

  private textSize: Signal<TextSize>;
  private lineHeight: Signal<LineHeight>;
  constructor(private store: Store<AppState>) {
    this.textSize = toSignal(this.store.select(selectTextSize)) as Signal<TextSize>;
    this.lineHeight = toSignal(this.store.select(selectLineHeight)) as Signal<LineHeight>;
    this.classList = computed(() => `recognized-text ${this.textSize()} ${this.lineHeight()}`)
    const recognitionPaused = toSignal(this.store.select(recognitionPausedSelector))
    const broadcastPaused = toSignal(this.store.select(selectBroadcastPaused))
    this.isPaused = computed(() => recognitionPaused() || broadcastPaused()) 
    this.textFlowDown = toSignal(this.store.pipe(
      select(selectTextFlow), 
      map((flow: TextFlow) => (flow === 'top-down'))));
  }
}
