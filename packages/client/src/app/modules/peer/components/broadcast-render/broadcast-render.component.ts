import { ChangeDetectorRef, Component, OnDestroy, OnInit, WritableSignal, computed, signal } from '@angular/core';
import { PeerService } from '../../services/peer.service';

import { Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { AppState } from '../../../../models/app.model';
import { selectHostOnline, selectPeerError, selectPeerServerConnected } from '../../../../selectors/peer.selectors';
import { recognitionErrorSelector } from '../../../../selectors/recognition.selector';

@Component({
  selector: 'app-broadcast-render',
  templateUrl: './broadcast-render.component.html',
  styleUrls: ['./broadcast-render.component.scss'],
})
export class BroadcastRenderComponent implements OnInit, OnDestroy {
  
  public connected: Signal<boolean | undefined>;
  public liveText: WritableSignal<string> = signal('');
  public textOutput: WritableSignal<string[]> = signal([]);
  public hasLiveResults: Signal<boolean>;
  public error: Signal<string | undefined>;

  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private store: Store<AppState>,
              private peerService: PeerService,
              private cd: ChangeDetectorRef) {

    const peerConnected = toSignal(this.store.select(selectPeerServerConnected));
    const hostOnline = toSignal(this.store.select(selectHostOnline));
    this.connected = computed(() => (peerConnected() && hostOnline()));

    const peerError = toSignal(this.store.select(selectPeerError));
    const recognitionError = toSignal(this.store.select(recognitionErrorSelector));
    this.error = computed(() => peerError() || recognitionError());

    this.hasLiveResults = computed(() => {
      if (this.connected()) {
        if (this.liveText() == '' && this.textOutput().length === 0) {
          return false;
        }
        return true;
      }
      return false;
    });
  }

  ngOnInit(): void {
    this.peerService.liveText$.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe((text) => {
      this.liveText.set(text);
      this.cd.detectChanges();
    });
    this.peerService.textOutput$.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe((results) => {
      this.textOutput.set(results);
      this.cd.detectChanges();
    })
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
