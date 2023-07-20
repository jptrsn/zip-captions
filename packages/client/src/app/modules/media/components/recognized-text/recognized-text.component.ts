import { Component, Signal, WritableSignal, computed, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { fadeInUpOnEnterAnimation, fadeOutOnLeaveAnimation, fadeOutUpOnLeaveAnimation } from 'angular-animations';
import { AppState } from '../../../../models/app.model';
import { RecognitionState, RecognitionStatus } from '../../../../models/recognition.model';
import { recognitionErrorSelector, selectRecognition } from '../../../../selectors/recognition.selector';
import { RecognitionService } from '../../services/recognition.service';

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
  public state: Signal<RecognitionState>;
  public connected: Signal<boolean | undefined>;
  public textOutput: Signal<string[]>;
  public hasLiveResults: Signal<boolean>;
  public error: Signal<string | undefined>;

  constructor(private store: Store<AppState>,
              private recognitionService: RecognitionService) {
    this.state = toSignal(this.store.select(selectRecognition)) as Signal<RecognitionState>;
    this.connected = computed(() => this.state().status !== RecognitionStatus.uninitialized);
    this.textOutput = computed(() => this.connected() ? this.recognitionService.getRecognizedText(this.state().id as string)() : [])
    this.error = toSignal(this.store.select(recognitionErrorSelector));
    this.hasLiveResults = computed(() => {
      if (this.connected()) {
        const liveText = this.recognitionService.getLiveOutput(this.state()?.id as string);
        if (liveText() == '' && this.textOutput().length === 0) {
          return false;
        }
      }
      return true;
    })
  }
}
