import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild, WritableSignal, computed, effect, signal } from '@angular/core';
import { PeerService } from '../../services/peer.service';

import { Signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { AppState } from '../../../../models/app.model';
import { selectBroadcastPaused, selectHostOnline, selectPeerServerConnected } from '../../../../selectors/peer.selectors';
import { recognitionErrorSelector } from '../../../../selectors/recognition.selector';
import { slideInRightOnEnterAnimation, slideInUpOnEnterAnimation, slideOutDownOnLeaveAnimation, slideOutRightOnLeaveAnimation } from 'angular-animations';
import { FullScreenService } from '../../../../services/full-screen/full-screen.service';

@Component({
  selector: 'app-broadcast-render',
  templateUrl: './broadcast-render.component.html',
  styleUrls: ['./broadcast-render.component.scss'],
  animations: [
    slideInRightOnEnterAnimation(),
    slideInUpOnEnterAnimation(),
    slideOutDownOnLeaveAnimation(),
    slideOutRightOnLeaveAnimation()
  ],
})
export class BroadcastRenderComponent implements OnInit, OnDestroy {
  
  public connected: Signal<boolean | undefined>;
  public liveText: WritableSignal<string> = signal('');
  public textOutput: WritableSignal<string[]> = signal([]);
  public hasLiveResults: Signal<boolean>;
  public error: Signal<string | undefined>;

  @ViewChild('enable') sidebarCheckbox!: ElementRef<HTMLInputElement>;

  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private store: Store<AppState>,
              private el: ElementRef,
              private fullScreen: FullScreenService,
              private peerService: PeerService,
              private cd: ChangeDetectorRef) {

    const peerConnected = toSignal(this.store.select(selectPeerServerConnected));
    const hostOnline = toSignal(this.store.select(selectHostOnline));
    this.connected = computed(() => (peerConnected() && hostOnline()));

    this.error = toSignal(this.store.select(recognitionErrorSelector));
    

    this.hasLiveResults = computed(() => {
      if (this.liveText() == '' && this.textOutput().length === 0) {
        return false;
      }
      return true;
    });

    if (this.fullScreen.isAvailable) {
      effect(() => {
        if (this.fullScreen.isFullscreen()) {
          this.sidebarCheckbox.nativeElement.checked = false;
        }
        this.cd.detectChanges();
      })
    }
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
    });
    if (this.fullScreen.isAvailable) {
      this.fullScreen.registerElement(this.el);
    }
  }

  ngOnDestroy(): void {
    if (this.fullScreen.isAvailable) {
      this.fullScreen.deregisterElement();
      this.store.select(selectBroadcastPaused).pipe(
        takeUntil(this.onDestroy$)
      ).subscribe(() => {
        console.log('pause changed');
        this.cd.detectChanges();
      })
    }
    this.onDestroy$.next();
  }

  updateDom(): void {
    this.cd.detectChanges()
  }
}
