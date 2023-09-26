import { Component, Input, Signal, computed, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store, select } from '@ngrx/store';
import { fadeOutOnLeaveAnimation } from 'angular-animations';
import { map } from 'rxjs';
import { AppState } from '../../../../models/app.model';
import { selectLineHeight, selectTextFlow, selectTextSize } from '../../../../selectors/settings.selector';
import { LineHeight, TextFlow, TextSize } from '../../../settings/models/settings.model';

@Component({
  selector: 'app-recognized-live-text',
  templateUrl: './recognized-live-text.component.html',
  styleUrls: ['./recognized-live-text.component.scss'],
  animations: [
    fadeOutOnLeaveAnimation()
  ]
})
export class RecognizedLiveTextComponent {
  @Input({ required: true}) text!: Signal<string>;
  public textFlowDown: Signal<boolean | undefined>;
  public classList: Signal<string>;

  private textSize: Signal<TextSize>;
  private lineHeight: Signal<LineHeight>;
  
  constructor(private store: Store<AppState>) {
    this.textSize = toSignal(this.store.select(selectTextSize)) as Signal<TextSize>;
    this.lineHeight = toSignal(this.store.select(selectLineHeight)) as Signal<LineHeight>;
    this.classList = computed(() => `recognized-text live ${this.textSize()} ${this.lineHeight()}`)

    this.textFlowDown = toSignal(this.store.pipe(
      select(selectTextFlow), 
      map((flow: TextFlow) => (flow === 'top-down'))));
  }
}
