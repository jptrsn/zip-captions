import { Component, Input, Signal, computed } from '@angular/core';
import { Store } from '@ngrx/store';
import { fadeOutOnLeaveAnimation } from 'angular-animations';
import { AppState } from '../../../../models/app.model';
import { LineHeight, TextSize } from '../../../settings/models/settings.model';
import { selectLineHeight, selectTextSize } from '../../../../selectors/settings.selector';
import { toSignal } from '@angular/core/rxjs-interop';

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
  
  private textSize: Signal<TextSize>;
  private lineHeight: Signal<LineHeight>;
  public classList: Signal<string>;
  constructor(private store: Store<AppState>) {
    this.textSize = toSignal(this.store.select(selectTextSize)) as Signal<TextSize>;
    this.lineHeight = toSignal(this.store.select(selectLineHeight)) as Signal<LineHeight>;
    this.classList = computed(() => `recognized-text live ${this.textSize()} ${this.lineHeight()}`)
  }
}
