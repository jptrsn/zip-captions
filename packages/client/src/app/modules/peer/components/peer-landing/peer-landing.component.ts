import { Component, OnDestroy, OnInit, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store, select } from '@ngrx/store';
import { PeerActions } from '../../../../actions/peer.actions';
import { AppState } from '../../../../models/app.model';
import { selectPeerError, selectPeerServerConnected, selectRoomId, selectSocketServerConnected } from '../../../../selectors/peer.selectors';
import { filter, take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-peer-landing',
  templateUrl: './peer-landing.component.html',
  styleUrls: ['./peer-landing.component.scss'],
})
export class PeerLandingComponent implements OnInit, OnDestroy {
  public socketServerConnected: Signal<boolean | undefined>;
  public peerServerConnected: Signal<boolean | undefined>;
  public serverError: Signal<string | undefined>;
  public roomId: Signal<string | undefined>;

  constructor(private store: Store<AppState>,
              private router: Router,
              private route: ActivatedRoute) {
    this.socketServerConnected = toSignal(this.store.select(selectSocketServerConnected))
    this.peerServerConnected = toSignal(this.store.select(selectPeerServerConnected));
    this.roomId = toSignal(this.store.select(selectRoomId));
    this.serverError = toSignal(this.store.select(selectPeerError));
  }

  ngOnInit(): void {
    this.store.dispatch(PeerActions.connectSocketServer());
  }

  ngOnDestroy(): void {
    this.store.dispatch(PeerActions.disconnectPeerServer());
  }

  createRoom() {
    this.store.dispatch(PeerActions.createBroadcastRoom());
  }
}
