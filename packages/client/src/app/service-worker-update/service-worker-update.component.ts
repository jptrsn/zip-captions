import { Component, OnDestroy, OnInit, Signal, WritableSignal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { SwUpdate, VersionEvent } from '@angular/service-worker';
import { expandRightOnEnterAnimation } from 'angular-animations';
import { Subject, filter, map, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-service-worker-update',
  templateUrl: './service-worker-update.component.html',
  styleUrls: ['./service-worker-update.component.scss'],
  animations: [
    expandRightOnEnterAnimation()
  ]
})
export class ServiceWorkerUpdateComponent {
  public message: Signal<VersionEvent['type'] | undefined>;
  
  constructor(private updates: SwUpdate) {
    this.message = toSignal<VersionEvent['type']>(this.updates.versionUpdates.pipe(
      tap((evt: VersionEvent) => {
        switch (evt.type) {
          case 'VERSION_DETECTED':
            console.log(`Downloading new app version: ${evt.version.hash}`);
            break;
          case 'VERSION_READY':
            console.log(`Current app version: ${evt.currentVersion.hash}`);
            console.log(`New app version ready for use: ${evt.latestVersion.hash}`);
            break;
          case 'VERSION_INSTALLATION_FAILED':
            console.log(`Failed to install app version '${evt.version.hash}': ${evt.error}`);
            break;
          case 'NO_NEW_VERSION_DETECTED':
            console.log(`No new version detected: ${evt.version.hash}`)
            break;
          }
      }),
      map((evt: VersionEvent) => evt.type),
      filter((type: VersionEvent['type']) => type !== 'NO_NEW_VERSION_DETECTED')
    ));
    if (this.updates.isEnabled) {
      this.updates.checkForUpdate();
    }
  }

  reload(): void {
    document.location.reload();
  }
}
