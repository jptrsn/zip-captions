import { Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { Observable, catchError, from, map, of } from 'rxjs';
import { AppState } from '../models/app.model';
import { wakeLockEnabledSelector } from '../selectors/app.selector';

@Injectable({
  providedIn: 'root'
})
export class WakeLockService {
  private sentinel?: WakeLockSentinel;
  private lockEnabled: Signal<boolean | undefined>;
  constructor(private store: Store<AppState>) {
    this.lockEnabled = toSignal(this.store.select(wakeLockEnabledSelector))
  }

  requestLock(): Observable<boolean> {
    if (this.lockEnabled()) {
      return from(navigator.wakeLock.request('screen')).pipe(
        map((sentinel) => {
          this.sentinel = sentinel;
          return true;
        }),
        catchError((err) => of(false))
      )
      
    }
    return of(false);
  }

  releaseLock(): Observable<boolean> {
    if (this.sentinel) {
      return from(this.sentinel.release()).pipe(
        map(() => (true)),
        catchError((err) => (of(false)))
      )
    }
    return of(true);
  }
}
