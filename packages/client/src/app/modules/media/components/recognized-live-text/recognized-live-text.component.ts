import { Component, Input, Signal, computed } from '@angular/core';
import { Store } from '@ngrx/store';
import { fadeOutOnLeaveAnimation } from 'angular-animations';
import { AppState } from '../../../../models/app.model';
import { TextSize } from '../../../settings/models/settings.model';
import { selectTextSize } from '../../../../selectors/settings.selector';
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
  
  public textSize: Signal<TextSize>;
  public classList: Signal<string>;
  constructor(private store: Store<AppState>) {
    this.textSize = toSignal(this.store.select(selectTextSize)) as Signal<TextSize>;
    this.classList = computed(() => `recognized-text live ${this.textSize()}`)
  }
}
