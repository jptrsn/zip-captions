import { Component, Signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { filter, map, of, switchMap } from 'rxjs';
import { RecognitionActions } from '../../../../actions/recogntion.actions';
import { AppState } from '../../../../models/app.model';
import { RecognitionEngineState, RecognitionStatus } from '../../../../models/recognition.model';
import { errorSelector, windowControlsOverlaySelector } from '../../../../selectors/app.selector';
import { recognitionErrorSelector, recognitionStatusSelector, selectRecognitionEngine } from '../../../../selectors/recognition.selector';

@Component({
  selector: 'app-recognition-enable',
  templateUrl: './recognition-enable.component.html',
  styleUrls: ['./recognition-enable.component.scss'],
})
export class RecognitionEnableComponent {
  public connected: Signal<boolean | undefined>;
  public disconnected: Signal<boolean | undefined>;
  public error: Signal<string | undefined>;
  public small: Signal<boolean | undefined>;
  public provider: Signal<RecognitionEngineState['provider'] | undefined>;

  constructor(private store: Store<AppState>,
              private translate: TranslateService,
              private router: Router) {
    this.connected = toSignal(this.store.pipe(select(recognitionStatusSelector),
    map((status: RecognitionStatus) => (status === RecognitionStatus.connected)),
    ));

    this.disconnected = toSignal(this.store.pipe(select(recognitionStatusSelector),
    map((status: RecognitionStatus) => (status === RecognitionStatus.disconnected)),
    ));

    const recogError = toSignal(this.store.select(recognitionErrorSelector))
    const appError = toSignal(this.store.pipe(
      select(errorSelector),
      filter((err) => err !== 'ERRORS.liveTextMissing'),
      switchMap((error: string | undefined) => error ? this.translate.get(error) : of(undefined))
    ));
    this.error = computed(() => recogError() || appError())
    this.small = toSignal(this.store.select(windowControlsOverlaySelector));
    this.provider = toSignal(this.store.pipe(
              select(selectRecognitionEngine),
              map((e) => e?.provider )
            ));
  }

  toggleState(): void {
    if (this.connected() || this.error()) {
      this.store.dispatch(RecognitionActions.disconnect({id: 'default'}));
    } else {
      if (this.router.url !== '/') {
        this.router.navigate(['/'])
      }
      this.store.dispatch(RecognitionActions.connect({id: 'default'}))
    }
  }
}
