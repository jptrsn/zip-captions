import { Component, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../models/app.model';
import { selectPeerError, selectPeerServerConnected } from '../../../../selectors/peer.selectors';
import { PeerActions } from '../../../../actions/peer.actions';

@Component({
  selector: 'app-peer-server-status-chip',
  templateUrl: './peer-server-status-chip.component.html',
  styleUrls: ['./peer-server-status-chip.component.scss'],
})
export class PeerServerStatusChipComponent {
  public connected: Signal<boolean | undefined>;
  public serverError: Signal<string | undefined>;
  constructor(private store: Store<AppState>) {
    this.connected = toSignal(this.store.select(selectPeerServerConnected));
    this.serverError = toSignal(this.store.select(selectPeerError));
  }

  reconnect(): void {
    if (!this.connected()) {
      this.store.dispatch(PeerActions.connectPeerServer());
    }
  }
}
