import { Component, Input, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../models/app.model';
import { PeerActions } from '../../../../actions/peer.actions';

@Component({
  selector: 'app-start-broadcast',
  templateUrl: './start-broadcast.component.html',
  styleUrls: ['./start-broadcast.component.scss'],
})
export class StartBroadcastComponent {
  @Input() acceptedPeerConnections!: Signal<boolean | undefined>;
  @Input() isMobileDevice!: Signal<boolean | undefined>;
  @Input() isIncompatibleBrowser!: Signal<boolean | undefined>;
  @Input() disabled!: boolean;

  constructor(private store: Store<AppState>) {}

  createRoom() {
    this.store.dispatch(PeerActions.createBroadcastRoom());
  }
}
