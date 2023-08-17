import { Component, OnDestroy, Signal, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, filter, take } from 'rxjs';
import { PeerActions } from '../../../../actions/peer.actions';
import { AppState } from '../../../../models/app.model';
import { selectJoinCode, selectPeerServerConnected } from '../../../../selectors/peer.selectors';
import { ComponentCanDeactivate } from '../../../../guards/active-stream/active-stream.guard';

@Component({
  selector: 'app-view-broadcast',
  templateUrl: './view-broadcast.component.html',
  styleUrls: ['./view-broadcast.component.scss'],
})
export class ViewBroadcastComponent implements ComponentCanDeactivate, OnDestroy {
  private roomId: string;
  private joinCode?: string;
  private connected: Signal<boolean | undefined>;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<AppState>) {
    this.roomId = this.route.snapshot.params['id'].toLowerCase();
    this.joinCode = this.route.snapshot.queryParams['joinCode']?.toLowerCase();
    this.connected = toSignal(this.store.select(selectPeerServerConnected));
    if (this.joinCode) {
      this.store.dispatch(PeerActions.setJoinCode({joinCode: this.joinCode}));
      this._joinRoom();
    }
    const stateJoinCode = toSignal(this.store.select(selectJoinCode));
    effect(() => {
      if (stateJoinCode() === undefined) {
        this.joinCode = undefined;
        this.router.navigate([], { relativeTo: this.route, queryParams: { joinCode: null}, queryParamsHandling: 'merge'})
      }
    })
  }

  canDeactivate(): boolean | Observable<boolean> {
    return true;
  }

  ngOnDestroy(): void {
    this.store.dispatch(PeerActions.leaveBroadcastRoom());
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
