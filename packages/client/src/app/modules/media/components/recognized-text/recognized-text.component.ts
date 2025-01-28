import { Component, Input, Signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store, select } from '@ngrx/store';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { AppState } from '../../../../models/app.model';
import { selectBroadcastPaused } from '../../../../selectors/peer.selectors';
import { recognitionPausedSelector } from '../../../../selectors/recognition.selector';
import { selectFontFamily, selectLineHeight, selectTextSize } from '../../../../selectors/settings.selector';
import { FontFamilyClassMap, LineHeight, TextSize } from '../../../settings/models/settings.model';
import { map } from 'rxjs';
import { RecognitionActions } from '../../../../actions/recogntion.actions';

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
  @Input({ required: true}) renderHistory!: Signal<number | undefined>;
  @Input() hintText = 'HINTS.beginSpeaking';

  public classList: Signal<string>;
  public isPaused: Signal<boolean | undefined>;
  public renderedResults: Signal<string[]>;
  public recognitionPaused: Signal<boolean | undefined>;

  private textSize: Signal<TextSize>;
  private lineHeight: Signal<LineHeight>;
  private fontClass: Signal<string>;

  constructor(private store: Store<AppState>) {
    this.textSize = toSignal(this.store.select(selectTextSize)) as Signal<TextSize>;
    this.lineHeight = toSignal(this.store.select(selectLineHeight)) as Signal<LineHeight>;
    this.fontClass = toSignal(this.store.pipe(select(selectFontFamily), map((font) => FontFamilyClassMap.get(font)))) as Signal<string>;
    this.classList = computed(() => `recognized-text ${this.textSize()} ${this.lineHeight()} ${this.fontClass()}`)
    this.recognitionPaused = toSignal(this.store.select(recognitionPausedSelector));
    const broadcastPaused = toSignal(this.store.select(selectBroadcastPaused));
    this.isPaused = computed(() => this.recognitionPaused() || broadcastPaused());

    this.renderedResults = computed(() => {
      const textArray = this.textOutput();
      const count = this.renderHistory();
      if (!count || textArray.length <= count) {
        return textArray;
      }
      return textArray.slice(count * -1);
    });
  }

  resume(): void {
    this.store.dispatch(RecognitionActions.resume())
  }
}
