import { Component, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { filter, take } from 'rxjs';
import { PeerActions } from '../../../../actions/peer.actions';
import { AppState } from '../../../../models/app.model';
import { selectPeerServerConnected } from '../../../../selectors/peer.selectors';

@Component({
  selector: 'app-view-broadcast',
  templateUrl: './view-broadcast.component.html',
  styleUrls: ['./view-broadcast.component.scss'],
})
export class ViewBroadcastComponent {
  private roomId: string;
  private joinCode?: string;
  private connected: Signal<boolean | undefined>;
  constructor(private route: ActivatedRoute,
              private store: Store<AppState>) {
    this.roomId = this.route.snapshot.params['id'].toLowerCase();
    this.joinCode = this.route.snapshot.queryParams['joinCode']?.toLowerCase();
    this.connected = toSignal(this.store.select(selectPeerServerConnected));
    if (this.joinCode) {
      this.store.dispatch(PeerActions.setJoinCode({joinCode: this.joinCode}));
      this._joinRoom();
    }
  }

  private _joinRoom(): void {
    if (!this.connected()) {
      this.store.pipe(
        select(selectPeerServerConnected),
        filter((connected) => !!connected),
        take(1))
        .subscribe(() => {
          this.store.dispatch(PeerActions.joinBroadcastRoom({id: this.roomId }))
        })
      this.store.dispatch(PeerActions.connectSocketServer())
    }
  }
}
