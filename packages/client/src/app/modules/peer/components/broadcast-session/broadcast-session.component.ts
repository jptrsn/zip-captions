import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PeerActions } from '../../../../actions/peer.actions';

@Component({
  selector: 'app-broadcast-session',
  templateUrl: './broadcast-session.component.html',
  styleUrls: ['./broadcast-session.component.scss'],
})
export class BroadcastSessionComponent {
  constructor(private store: Store) {}
  
}
