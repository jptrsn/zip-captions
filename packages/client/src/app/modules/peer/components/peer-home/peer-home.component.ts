import { Component, OnDestroy, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { PeerActions } from '../../../../actions/peer.actions';
import { AppState } from '../../../../models/app.model';
import { selectPeerServerConnected, selectSocketServerConnected } from '../../../../selectors/peer.selectors';

@Component({
  selector: 'app-peer-home',
  templateUrl: './peer-home.component.html',
  styleUrls: ['./peer-home.component.scss'],
})
export class PeerHomeComponent implements OnDestroy {
  private socketServerConnected: Signal<boolean | undefined>;
  private peerServerConnected: Signal<boolean | undefined>;
  constructor(private store: Store<AppState>) {
    this.socketServerConnected = toSignal(this.store.select(selectSocketServerConnected))
    this.peerServerConnected = toSignal(this.store.select(selectPeerServerConnected));
  }
  ngOnDestroy(): void {
    if (this.peerServerConnected()) {
      this.store.dispatch(PeerActions.disconnectPeerServer());
    }
    if (this.socketServerConnected()) {
      this.store.dispatch(PeerActions.disconnectSocketServer());
    }
  }
}
