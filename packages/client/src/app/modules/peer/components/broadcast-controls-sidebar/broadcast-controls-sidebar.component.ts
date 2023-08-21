import { Component, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../models/app.model';
import { recognitionStatusSelector } from '../../../../selectors/recognition.selector';
import { map } from 'rxjs';
import { RecognitionStatus } from '../../../../models/recognition.model';

@Component({
  selector: 'app-broadcast-controls-sidebar',
  templateUrl: './broadcast-controls-sidebar.component.html',
  styleUrls: ['./broadcast-controls-sidebar.component.scss'],
})
export class BroadcastControlsSidebarComponent {
  public recognitionActive: Signal<boolean | undefined>;
  constructor(private store: Store<AppState>) {
    this.recognitionActive = toSignal(this.store.pipe(select(recognitionStatusSelector), map((status) => status === RecognitionStatus.connected)))
  }
}
