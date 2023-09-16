import { Component, Signal, WritableSignal, signal } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { Store } from '@ngrx/store';
import { AppActions, AppState, Connectivity } from '../../models/app.model';
import { isOfflineSelector } from '../../selectors/app.selector';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-offline-warning',
  templateUrl: './offline-warning.component.html',
  styleUrls: ['./offline-warning.component.scss'],
})
export class OfflineWarningComponent {
  private isInstalled: WritableSignal<boolean> = signal(false);
  private isUsingPwa: WritableSignal<boolean> = signal(false);
  public isOffline: Signal<boolean | undefined>;

  constructor(private store: Store<AppState>,
              private storage: StorageService) {

    this.store.dispatch(AppActions.updateConnectivityState({connectivity: window.navigator.onLine ? Connectivity.online : Connectivity.offline}));
    window.addEventListener('online', () => this.store.dispatch(AppActions.updateConnectivityState({connectivity: Connectivity.online})));
    window.addEventListener('offline', () => this.store.dispatch(AppActions.updateConnectivityState({connectivity: Connectivity.offline})));

    this.isOffline = toSignal(this.store.select(isOfflineSelector));

    // Installation state logic temporarily
    const isInstalled: string | undefined = this.storage.get('pwaInstalled');
    if (isInstalled === '1') {
      this.isInstalled.set(true);
    }

    if (window.matchMedia('(display-mode: standalone)').matches) {
      console.log('matches standalone');
      if (!this.isInstalled()) {
        this.storage.set('pwaInstalled', '1');
        this.isInstalled.set(true);
      }
      this.isUsingPwa.set(true);
    } else {
      window.addEventListener('beforeinstallprompt', () => {
        console.log('app uninstalled')
        this.storage.remove('pwaInstalled');
        this.isInstalled.set(false);
      });
      window.addEventListener('onappinstalled', () => {
        console.log('app installed');
        this.storage.set('pwaInstalled', '1');
        this.isInstalled.set(true);
      })
    }
    /*
    document.addEventListener('DOMContentLoaded', () => {
      // @ts-expect-error Property standalone only exists on navigator in iOS
      const navStandalone = window.navigator.standalone;
      const isPwa: boolean = matchMedia('(display-mode: standalone)').matches || navStandalone;
      console.log('DOMContent loaded. isPwa', isPwa)
      if (isPwa) {
        window.resizeTo(420, 800);
      }
    })
    */
  }
}
