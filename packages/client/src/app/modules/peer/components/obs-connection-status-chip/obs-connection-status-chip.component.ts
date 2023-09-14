import { Component, Signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../models/app.model';
import { ObsConnectionState } from '../../../../reducers/obs.reducer';
import { selectObsConnected, selectObsStreamActive } from '../../../../selectors/obs.selectors';

@Component({
  selector: 'app-obs-connection-status-chip',
  templateUrl: './obs-connection-status-chip.component.html',
  styleUrls: ['./obs-connection-status-chip.component.scss'],
})
export class ObsConnectionStatusChipComponent {

  public connected: Signal<boolean | undefined>;
  public streamingActive: Signal<boolean | undefined>;
  public connectionState: Signal<ObsConnectionState | undefined>;
  constructor(private store: Store<AppState>) {
    this.connectionState = toSignal(this.store.select(selectObsConnected));
    this.connected = computed(() => this.connectionState() === ObsConnectionState.connected);
    this.streamingActive = toSignal(this.store.select(selectObsStreamActive));
  }
}
