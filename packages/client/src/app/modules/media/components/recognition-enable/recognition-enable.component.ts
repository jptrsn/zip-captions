import { Component, Signal } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../models/app.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { recognitionErrorSelector, recognitionStatusSelector } from '../../../../selectors/recognition.selector';
import { RecognitionActions, RecognitionStatus } from '../../../../models/recognition.model';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-recognition-enable',
  templateUrl: './recognition-enable.component.html',
  styleUrls: ['./recognition-enable.component.scss'],
})
export class RecognitionEnableComponent {
  public connected: Signal<boolean | undefined>;
  public error: Signal<string | undefined>;
  constructor(private store: Store<AppState>) {
    this.connected = toSignal(this.store.pipe(select(recognitionStatusSelector), 
    tap((status) => console.log(status)),
    map((status: RecognitionStatus) => (status === RecognitionStatus.connected)),
    tap((value) => console.log(value))));
    this.error = toSignal(this.store.pipe(select(recognitionErrorSelector)))
  }

  toggleState(): void {
    if (this.connected()) {
      this.store.dispatch(RecognitionActions.disconnectRecognition({id: 'default'}));
    } else {
      this.store.dispatch(RecognitionActions.connectRecognition({id: 'default'}))
    }
  }
}
