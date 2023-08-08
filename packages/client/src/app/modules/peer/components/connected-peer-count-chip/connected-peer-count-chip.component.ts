import { Component, Signal } from '@angular/core';
import { AppState } from '../../../../models/app.model';
import { Store } from '@ngrx/store';
import { selectConnectedPeerCount } from '../../../../selectors/peer.selectors';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-connected-peer-count-chip',
  templateUrl: './connected-peer-count-chip.component.html',
  styleUrls: ['./connected-peer-count-chip.component.scss'],
})
export class ConnectedPeerCountChipComponent {
  public count: Signal<number>;
  constructor(private store: Store<AppState>) {
    this.count = toSignal(this.store.select(selectConnectedPeerCount)) as Signal<number>;
  }
}
