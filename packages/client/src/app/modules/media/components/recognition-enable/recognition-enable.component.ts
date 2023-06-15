import { Component, Signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store, select } from '@ngrx/store';
import { errorSelector } from '../../../../selectors/app.selector';
import { filter, map, of, switchMap, tap } from 'rxjs';
import { AppState } from '../../../../models/app.model';
import { RecognitionActions, RecognitionStatus } from '../../../../models/recognition.model';
import { recognitionErrorSelector, recognitionStatusSelector } from '../../../../selectors/recognition.selector';
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-recognition-enable',
  templateUrl: './recognition-enable.component.html',
  styleUrls: ['./recognition-enable.component.scss'],
})
export class RecognitionEnableComponent {
  public connected: Signal<boolean | undefined>;
  public disconnected: Signal<boolean | undefined>;
  public error: Signal<string | undefined>;
  constructor(private store: Store<AppState>,
              private translate: TranslateService) {
    this.connected = toSignal(this.store.pipe(select(recognitionStatusSelector), 
    map((status: RecognitionStatus) => (status === RecognitionStatus.connected)),
    ));

    this.disconnected = toSignal(this.store.pipe(select(recognitionStatusSelector), 
    map((status: RecognitionStatus) => (status === RecognitionStatus.disconnected)),
    ));

    const recogError = toSignal(this.store.select(recognitionErrorSelector))
    const appError = toSignal(this.store.pipe(
      select(errorSelector),
      filter((err) => err !== 'liveTextMissing'),
      switchMap((error: string | undefined) => error ? this.translate.get(error) : of(undefined))
    ));
    this.error = computed(() => recogError() || appError())
  }

  toggleState(): void {
    if (this.connected()) {
      this.store.dispatch(RecognitionActions.disconnectRecognition({id: 'default'}));
    } else {
      this.store.dispatch(RecognitionActions.connectRecognition({id: 'default'}))
    }
  }
}
