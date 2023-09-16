import { Component, Signal, WritableSignal, signal } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../models/app.model';
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

    this.isOffline = toSignal(this.store.select(isOfflineSelector));
    console.log('offline warning component');
    const isInstalled = this.storage.get('pwaInstalled');
    if (isInstalled === '1') {
      this.isInstalled.set(true);
    }

    if (window.matchMedia('(display-mode: standalone)').matches) {
      if (!this.isInstalled()) {
        this.storage.set('pwaInstalled', '1');
        this.isInstalled.set(true);
      }
      this.isUsingPwa.set(true);
    } else {
      window.addEventListener('beforeinstallprompt', () => {
        this.storage.set('pwaInstalled', '0');
        this.isInstalled.set(false);
      });
      window.addEventListener('onappinstalled', () => {
        this.storage.set('pwaInstalled', '1');
        this.isInstalled.set(true);
      })
    }
  }
}
