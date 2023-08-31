import { Component, Signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { slideInRightOnEnterAnimation, slideInUpOnEnterAnimation, slideOutDownOnLeaveAnimation, slideOutRightOnLeaveAnimation } from 'angular-animations';
import { AppState } from '../../../../models/app.model';
import { RecognitionState, RecognitionStatus } from '../../../../models/recognition.model';
import { recognitionErrorSelector, recognitionIdSelector, selectRecognition } from '../../../../selectors/recognition.selector';
import { RecognitionService } from '../../services/recognition.service';

@Component({
  selector: 'app-recognition-render',
  templateUrl: './recognition-render.component.html',
  styleUrls: ['./recognition-render.component.scss'],
  animations: [
    slideInRightOnEnterAnimation(),
    slideInUpOnEnterAnimation(),
    slideOutDownOnLeaveAnimation(),
    slideOutRightOnLeaveAnimation()
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
    const id: Signal<string | undefined> = toSignal(this.store.select(recognitionIdSelector));
    this.liveText = computed(() => id() ? this.recognitionService.getLiveOutput(id() as string)() : '');
    this.textOutput = computed(() => id() ? this.recognitionService.getRecognizedText(id() as string)() : []);
    this.hasLiveResults = computed(() => {
      if (this.connected()) {
        if (this.liveText() == '' && this.textOutput().length === 0) {
          return false;
        }
        return true;
      }
      return this.state()?.status != RecognitionStatus.uninitialized;
    });
    this.error = toSignal(this.store.select(recognitionErrorSelector));
  }
}
