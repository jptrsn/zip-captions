import { Component, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { AppActions, AppState, Connectivity } from '../../models/app.model';
import { isOfflineSelector } from '../../selectors/app.selector';

@Component({
  selector: 'app-offline-warning',
  templateUrl: './offline-warning.component.html',
  styleUrls: ['./offline-warning.component.scss'],
})
export class OfflineWarningComponent {
  public isOffline: Signal<boolean | undefined>;

  constructor(private store: Store<AppState>) {

    this.store.dispatch(AppActions.updateConnectivityState({connectivity: window.navigator.onLine ? Connectivity.online : Connectivity.offline}));
    window.addEventListener('online', () => this.store.dispatch(AppActions.updateConnectivityState({connectivity: Connectivity.online})));
    window.addEventListener('offline', () => this.store.dispatch(AppActions.updateConnectivityState({connectivity: Connectivity.offline})));

    this.isOffline = toSignal(this.store.select(isOfflineSelector));
  }
}
