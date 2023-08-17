import { Component, OnDestroy, OnInit, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subject, filter, take } from 'rxjs';
import { PeerActions } from '../../../../actions/peer.actions';
import { AppState } from '../../../../models/app.model';
import { selectPeerServerConnected } from '../../../../selectors/peer.selectors';
import { CacheService } from '../../../../services/cache/cache.service';

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
              private store: Store<AppState>,
              private cache: CacheService) {
    this.roomId = this.route.snapshot.params['id'].toLowerCase();
    this.connected = toSignal(this.store.select(selectPeerServerConnected));
  }

  ngOnInit(): void {
    const cachedJoinCode = this.cache.load('joinCode');
    if (cachedJoinCode) {
      console.log('cached join code');
    }
    
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  private _rejoin(joinCode: string): void {
    if (!this.connected()) {
      this.store.pipe(
        select(selectPeerServerConnected),
        filter((connected) => !!connected),
        take(1))
        .subscribe(() => {
          this.store.dispatch(PeerActions.joinBroadcastRoom({id: this.roomId, joinCode}))
        })
      this.store.dispatch(PeerActions.connectSocketServer())
    }
  }
}
