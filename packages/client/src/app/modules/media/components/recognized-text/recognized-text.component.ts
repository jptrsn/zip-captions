import { Component, Signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { slideInUpOnEnterAnimation } from 'angular-animations';
import { AppState } from '../../../../models/app.model';
import { RecognitionState, RecognitionStatus } from '../../../../models/recognition.model';
import { selectRecognition } from '../../../../selectors/recognition.selector';
import { RecognitionService } from '../../services/recognition.service';

@Component({
  selector: 'app-recognized-text',
  templateUrl: './recognized-text.component.html',
  styleUrls: ['./recognized-text.component.scss'],
  animations: [
    slideInUpOnEnterAnimation()
  ]
})
export class RecognizedTextComponent {
  public state: Signal<RecognitionState>;
  public connected: Signal<boolean | undefined>;
  public textOutput: Signal<string[]>;
  constructor(private store: Store<AppState>,
              private recognitionService: RecognitionService) {
    this.state = toSignal(this.store.select(selectRecognition)) as Signal<RecognitionState>;
    this.connected = computed(() => this.state().status !== RecognitionStatus.uninitialized);
    this.textOutput = computed(() => this.connected() ? this.recognitionService.getRecognizedText(this.state().id as string)() : [])
  }
}
