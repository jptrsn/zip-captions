import { Component, WritableSignal, signal } from '@angular/core';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-detect-pwa-install',
  templateUrl: './detect-pwa-install.component.html',
  styleUrls: ['./detect-pwa-install.component.scss'],
})
export class DetectPwaInstallComponent {
  private isInstalled: WritableSignal<boolean> = signal(false);
  private isUsingPwa: WritableSignal<boolean> = signal(false);
  
  constructor(private storage: StorageService) {
    const isInstalled: string | undefined = this.storage.get('pwaInstalled');
    if (isInstalled === '1') {
      this.isInstalled.set(true);
    }

    if (window.matchMedia('(display-mode: standalone)').matches) {
      console.log('matches standalone');
      if (!this.isInstalled()) {
        this._markInstalled();
      }
      this.isUsingPwa.set(true);
    } else {
      window.addEventListener('beforeinstallprompt', (e: any) => {
        console.log('beforeinstallprompt', e);
        if (this.isInstalled()) {
          this._removeInstallMark();
        }
      });
      window.addEventListener('appinstalled', () => {
        this._markInstalled();
      })
    }
    
    document.addEventListener('DOMContentLoaded', () => {
      // @ts-expect-error Property standalone only exists on navigator in iOS
      const navStandalone = window.navigator.standalone;
      const isPwa: boolean = window.matchMedia('(display-mode: standalone)').matches || navStandalone;
      if (isPwa && !this.isInstalled()) {
        this._markInstalled();
      }
    })
  }

  private _markInstalled(): void {
    this.storage.set('pwaInstalled', '1');
    this.isInstalled.set(true);
    window.resizeTo(420, 800);
  }

  private _removeInstallMark(): void {
    this.storage.remove('pwaInstalled');
    this.isInstalled.set(false);
  }
}
