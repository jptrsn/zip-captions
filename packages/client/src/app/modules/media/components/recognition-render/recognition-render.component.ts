import { Component, EventEmitter, Output, Signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { slideInUpOnEnterAnimation, slideOutDownOnLeaveAnimation } from 'angular-animations';
import { AppState } from '../../../../models/app.model';
import { RecognitionState, RecognitionStatus } from '../../../../models/recognition.model';
import { recognitionErrorSelector, selectRecognition } from '../../../../selectors/recognition.selector';
import { RecognitionService } from '../../services/recognition.service';

@Component({
  selector: 'app-recognition-render',
  templateUrl: './recognition-render.component.html',
  styleUrls: ['./recognition-render.component.scss'],
  animations: [
    slideInUpOnEnterAnimation(),
    slideOutDownOnLeaveAnimation()
  ]
})
export class RecognitionRenderComponent {

  public state: Signal<RecognitionState | undefined>;
  public connected: Signal<boolean | undefined>;
  public liveText: Signal<string>;
  public textOutput: Signal<string[]>;
  public hasLiveResults: Signal<boolean>;
  public error: Signal<string | undefined>;

  constructor(private store: Store<AppState>,
              private recognitionService: RecognitionService) {
    this.state = toSignal(this.store.select(selectRecognition));
    this.connected = computed(() => this.state()?.status === RecognitionStatus.connected);
    this.liveText = computed(() => this.connected() ? this.recognitionService.getLiveOutput(this.state()?.id as string)() : '')
    this.textOutput = computed(() => this.connected() ? this.recognitionService.getRecognizedText(this.state()?.id as string)() : [])
    this.hasLiveResults = computed(() => {
      if (this.connected()) {
        if (this.liveText() == '' && this.textOutput().length === 0) {
          return false;
        }
        return true;
      }
      return false;
    });
    this.error = toSignal(this.store.select(recognitionErrorSelector));
  }
}
