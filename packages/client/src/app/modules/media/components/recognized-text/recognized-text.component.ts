import { Component, Input, Signal, computed, signal } from '@angular/core';
import { fadeInUpOnEnterAnimation, fadeOutOnLeaveAnimation, fadeOutUpOnLeaveAnimation } from 'angular-animations';
import { LineHeight, TextSize } from '../../../settings/models/settings.model';
import { AppState } from '../../../../models/app.model';
import { Store, select } from '@ngrx/store';
import { selectLineHeight, selectTextSize } from '../../../../selectors/settings.selector';
import { toSignal } from '@angular/core/rxjs-interop';
import { recognitionStatusSelector } from 'packages/client/src/app/selectors/recognition.selector';
import { RecognitionStatus } from 'packages/client/src/app/models/recognition.model';
import { map } from 'rxjs';

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
  @Input({ required: true}) hasLiveResults!: Signal<boolean>;
  @Input({ required: true}) textOutput!: Signal<string[]>;
  @Input({ required: true}) error!: Signal<string | undefined>;
  @Input() hintText = 'HINTS.beginSpeaking';
  
  public classList: Signal<string>;
  public isPaused: Signal<boolean | undefined>;

  private textSize: Signal<TextSize>;
  private lineHeight: Signal<LineHeight>;
  constructor(private store: Store<AppState>) {
    this.textSize = toSignal(this.store.select(selectTextSize)) as Signal<TextSize>;
    this.lineHeight = toSignal(this.store.select(selectLineHeight)) as Signal<LineHeight>;
    this.classList = computed(() => `recognized-text ${this.textSize()} ${this.lineHeight()}`)
    this.isPaused = toSignal(this.store.pipe(
      select(recognitionStatusSelector),
      map((status) => status === RecognitionStatus.paused)
    ));
  }
}
