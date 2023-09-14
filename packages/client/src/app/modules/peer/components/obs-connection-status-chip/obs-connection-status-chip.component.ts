import { Component, Signal, computed } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../models/app.model';
import { selectObsConnected } from '../../../../selectors/obs.selectors';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ObsConnectionState } from '../../../../reducers/obs.reducer';

@Component({
  selector: 'app-obs-connection-status-chip',
  templateUrl: './obs-connection-status-chip.component.html',
  styleUrls: ['./obs-connection-status-chip.component.scss'],
})
export class ObsConnectionStatusChipComponent {

  public connected: Signal<boolean | undefined>;
  public connectionState: Signal<ObsConnectionState | undefined>;
  constructor(private store: Store<AppState>) {
    this.connectionState = toSignal(this.store.select(selectObsConnected));
    this.connected = computed(() => this.connectionState() === ObsConnectionState.connected);
  }
}
