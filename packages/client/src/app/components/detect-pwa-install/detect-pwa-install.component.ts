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
        this.storage.set('pwaInstalled', '1');
        this.isInstalled.set(true);
      }
      this.isUsingPwa.set(true);
    } else {
      window.addEventListener('beforeinstallprompt', (e: any) => {
        e.preventDefault();
        if (this.isInstalled()) {
          console.log('app uninstalled')
          this.storage.remove('pwaInstalled');
          this.isInstalled.set(false);
        } else {
          console.log('not installed - prompt?')
        }
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
