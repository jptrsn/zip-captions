import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PeerActions } from '../../../../actions/peer.actions';

@Component({
  selector: 'app-peer-landing',
  templateUrl: './peer-landing.component.html',
  styleUrls: ['./peer-landing.component.scss'],
})
export class PeerLandingComponent implements OnInit, OnDestroy {
  constructor(private store: Store) {}

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
