import { CommonModule } from '@angular/common';
import { Component, Signal } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../models/app.model';
import { PeerActions } from '../../actions/peer.actions';
import { selectPeerState } from '../../selectors/peer.selectors';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-socket-debug',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './socket-debug.component.html',
  styleUrls: ['./socket-debug.component.scss'],
})
export class SocketDebugComponent {
  private userId: Signal<string | undefined>;
  constructor(private store: Store<AppState>) {
    this.userId = toSignal(this.store.pipe(select(selectPeerState), map((state) => state.id)));
  }

  sendSocketDisconnected(): void {
    console.log('dispatching socket disconnected');
    this.store.dispatch(PeerActions.socketServerDisconnected());
  }

  sendUserIdAssigned(): void {
    console.log('dispatching socketUserIdAssigned', this.userId());
    this.store.dispatch(PeerActions.socketServerUserIdAssigned({id: this.userId() || ''}))
  }

  sendConnectPeerServer(): void {
    this.store.dispatch(PeerActions.connectPeerServer());
  }
}
