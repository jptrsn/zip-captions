import { Component, Input, Signal, computed, signal } from '@angular/core';
import { fadeInUpOnEnterAnimation, fadeOutOnLeaveAnimation, fadeOutUpOnLeaveAnimation } from 'angular-animations';
import { LineHeight, TextSize } from '../../../settings/models/settings.model';
import { AppState } from '../../../../models/app.model';
import { Store } from '@ngrx/store';
import { selectLineHeight, selectTextSize } from '../../../../selectors/settings.selector';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-recognized-text',
  templateUrl: './recognized-text.component.html',
  styleUrls: ['./recognized-text.component.scss'],
  animations: [
    fadeInUpOnEnterAnimation(),
    fadeOutUpOnLeaveAnimation(),
    fadeOutOnLeaveAnimation(),
  ]
})
export class RecognizedTextComponent {
  @Input({ required: true}) connected!: Signal<boolean | undefined>;
  @Input() hasLiveResults: Signal<boolean> = signal(true);
  @Input({ required: true}) textOutput!: Signal<string[]>;
  @Input({ required: true}) error!: Signal<string | undefined>;
  @Input() hintText = 'HINTS.beginSpeaking';
  
  private textSize: Signal<TextSize>;
  private lineHeight: Signal<LineHeight>;
  public classList: Signal<string>;
  constructor(private store: Store<AppState>) {
    this.textSize = toSignal(this.store.select(selectTextSize)) as Signal<TextSize>;
    this.lineHeight = toSignal(this.store.select(selectLineHeight)) as Signal<LineHeight>;
    this.classList = computed(() => `recognized-text ${this.textSize()} ${this.lineHeight()}`)
  }
}
