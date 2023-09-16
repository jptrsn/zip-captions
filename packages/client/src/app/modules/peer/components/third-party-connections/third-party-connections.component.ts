import { Component, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../models/app.model';
import { ObsConnectionState } from '../../../../reducers/obs.reducer';
import { selectObsConnected } from '../../../../selectors/obs.selectors';
import { map } from 'rxjs';

@Component({
  selector: 'app-third-party-connections',
  templateUrl: './third-party-connections.component.html',
  styleUrls: ['./third-party-connections.component.scss'],
})
export class ThirdPartyConnectionsComponent {
  public obsConnected: Signal<boolean | undefined>;
  constructor(private store: Store<AppState>) {
    this.obsConnected = toSignal(this.store.pipe(select(selectObsConnected), map((conn) => conn === ObsConnectionState.connected)));
  }
}
