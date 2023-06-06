import { Component, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../models/app.model';
import { loadingSelector } from '../../selectors/app.selector';
import { recognitionStatusSelector } from '../../selectors/recognition.selector';
import { RecognitionStatus } from '../../models/recognition.model';
import { map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public loading: Signal<boolean | undefined>;
  public isRecognizing: Signal<boolean | undefined>;
  public hasResults: Signal<boolean>;
  constructor(private store: Store<AppState>) { 
    this.loading = toSignal(this.store.pipe(select(loadingSelector)))
    this.isRecognizing = toSignal(this.store.pipe(
      select(recognitionStatusSelector),
      map((status: RecognitionStatus) => status === RecognitionStatus.connected)
      ))

    this.hasResults = toSignal(this.store.pipe(
      select(recognitionStatusSelector),
      map((status: RecognitionStatus) => status !== RecognitionStatus.uninitialized)
    )) as Signal<boolean>
  }
}
