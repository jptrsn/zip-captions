import { Component, OnDestroy, OnInit, Signal, computed, effect } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subject, filter, take } from 'rxjs';
import { PeerActions } from '../../../../actions/peer.actions';
import { AppState } from '../../../../models/app.model';
import { PeerState } from '../../../../reducers/peer.reducer';
import { selectPeerServerConnected, selectPeerState } from '../../../../selectors/peer.selectors';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-view-broadcast',
  templateUrl: './view-broadcast.component.html',
  styleUrls: ['./view-broadcast.component.scss'],
})
export class ViewBroadcastComponent implements OnInit, OnDestroy {
  private onDestroy$: Subject<void> = new Subject<void>();
  private roomId: string;
  private connected: Signal<boolean | undefined>;
  constructor(private route: ActivatedRoute,
              private store: Store<AppState>) {
    this.roomId = this.route.snapshot.params['id'].toLowerCase();
    this.connected = toSignal(this.store.select(selectPeerServerConnected));
  }

  ngOnInit(): void {
    if (!this.connected()) {
      this.store.pipe(
        select(selectPeerServerConnected),
        filter((connected) => !!connected),
        take(1))
        .subscribe(() => {
          this.store.dispatch(PeerActions.joinBroadcastRoom({id: this.roomId}))
        })
      this.store.dispatch(PeerActions.connectSocketServer())
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
