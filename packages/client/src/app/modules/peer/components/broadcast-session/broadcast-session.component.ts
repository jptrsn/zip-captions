import { Component, OnDestroy, OnInit } from '@angular/core';
import { PeerService } from '../../services/peer.service';
import { Store } from '@ngrx/store';
import { PeerActions } from '../../../../actions/peer.actions';

@Component({
  selector: 'app-broadcast-session',
  templateUrl: './broadcast-session.component.html',
  styleUrls: ['./broadcast-session.component.scss'],
})
export class BroadcastSessionComponent implements OnInit, OnDestroy {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(PeerActions.connectSocketServer());
  }

  ngOnDestroy(): void {
    this.store.dispatch(PeerActions.disconnectSocketServer());
  }

  createRoom() {
    this.store.dispatch(PeerActions.createBroadcastRoom())
  }
}
