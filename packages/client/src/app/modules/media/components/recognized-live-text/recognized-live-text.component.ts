import { Component, Signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectRecognition } from '../../../../selectors/recognition.selector';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../models/app.model';
import { RecognitionState, RecognitionStatus } from '../../../../models/recognition.model';
import { RecognitionService } from '../../services/recognition.service';

@Component({
  selector: 'app-recognized-live-text',
  templateUrl: './recognized-live-text.component.html',
  styleUrls: ['./recognized-live-text.component.scss'],
})
export class RecognizedLiveTextComponent {
  public state: Signal<RecognitionState | undefined>;
  public connected: Signal<boolean | undefined>;
  public text: Signal<string>;
  constructor(private store: Store<AppState>,
              private recognitionService: RecognitionService) {
                this.state = toSignal(this.store.select(selectRecognition));
                this.connected = computed(() => this.state()?.status === RecognitionStatus.connected);
                this.text = computed(() => this.connected() ? this.recognitionService.getLiveOutput(this.state()?.id as string)() : '')
  }
}
