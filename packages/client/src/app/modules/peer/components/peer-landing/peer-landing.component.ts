import { Component, HostListener, OnDestroy, OnInit, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store, select } from '@ngrx/store';
import { PeerActions } from '../../../../actions/peer.actions';
import { AppState } from '../../../../models/app.model';
import { selectPeerError, selectPeerServerConnected, selectRoomId, selectSocketServerConnected, streamIsActive } from '../../../../selectors/peer.selectors';
import { Observable, filter, take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentCanDeactivate } from '../../../../guards/active-stream/active-stream.guard';

@Component({
  selector: 'app-peer-landing',
  templateUrl: './peer-landing.component.html',
  styleUrls: ['./peer-landing.component.scss'],
})
export class PeerLandingComponent implements OnInit, OnDestroy, ComponentCanDeactivate {
  @HostListener('window:beforeunload')
  public socketServerConnected: Signal<boolean | undefined>;
  public peerServerConnected: Signal<boolean | undefined>;
  public serverError: Signal<string | undefined>;
  public roomId: Signal<string | undefined>;

  constructor(private store: Store<AppState>) {
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

  canDeactivate(): boolean | Observable<boolean> {
    return !toSignal(this.store.select(streamIsActive))();
  }

  createRoom() {
    this.store.dispatch(PeerActions.createBroadcastRoom());
  }
}
