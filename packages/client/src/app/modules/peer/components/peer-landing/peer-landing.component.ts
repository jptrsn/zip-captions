import { Component, ElementRef, HostListener, OnDestroy, OnInit, Signal, ViewChild, effect } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { AbstractControl, FormBuilder, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, filter, map, startWith, take, tap } from 'rxjs';
import { ObsActions } from '../../../../actions/obs.actions';
import { PeerActions } from '../../../../actions/peer.actions';
import { ComponentCanDeactivate } from '../../../../guards/active-stream/active-stream.guard';
import { AppPlatform, AppState } from '../../../../models/app.model';
import { RecognitionActions } from '../../../../actions/recogntion.actions';
import { ObsConnectionState } from '../../../../reducers/obs.reducer';
import { peerConnectionsAcceptedSelector, platformSelector } from '../../../../selectors/app.selector';
import { selectObsConnected } from '../../../../selectors/obs.selectors';
import { selectIsBroadcasting, selectJoinCode, selectPeerError, selectPeerServerConnected, selectRoomId, selectServerOffline, selectSocketServerConnected } from '../../../../selectors/peer.selectors';
import { recognitionActiveSelector } from '../../../../selectors/recognition.selector';

@Component({
  selector: 'app-peer-landing',
  templateUrl: './peer-landing.component.html',
  styleUrls: ['./peer-landing.component.scss'],
})
export class PeerLandingComponent implements OnDestroy, ComponentCanDeactivate {
  @ViewChild('broadcastOpen') broadcastCheckbox!: ElementRef<HTMLInputElement>;
  public acceptedPeerConnections: Signal<boolean | undefined>;
  public socketServerConnected: Signal<boolean | undefined>;
  public peerServerConnected: Signal<boolean | undefined>;
  public serverError: Signal<string | undefined>;
  public serverOffline: Signal<boolean | undefined>;
  public roomId: Signal<string | undefined>;
  public joinCode: Signal<string | undefined>;
  public isBroadcasting: Signal<boolean | undefined>;
  public isMobileDevice: Signal<boolean | undefined>;
  public isIncompatibleBrowser: Signal<boolean | undefined>;
  public recognitionActive: Signal<boolean | undefined>;
  public showObsStatus: Signal<boolean | undefined>;

  public joinSessionFormGroup = this.fb.group({
    session: this.fb.control<string>('', [Validators.required, (ctrl) => this._validateSessionId(ctrl)]),
    joinCode: this.fb.control<string>('', [Validators.required, (ctrl) => this._validateJoinCode(ctrl)])
  });

  public tabsControl: FormControl;
  public tabIndex: Signal<number>;

  public tabNames: string[];

  constructor(private store: Store<AppState>,
              private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) {
    this.acceptedPeerConnections = toSignal(this.store.select(peerConnectionsAcceptedSelector))
    this.socketServerConnected = toSignal(this.store.select(selectSocketServerConnected))
    this.peerServerConnected = toSignal(this.store.select(selectPeerServerConnected));
    this.roomId = toSignal(this.store.select(selectRoomId));
    this.joinCode = toSignal(this.store.select(selectJoinCode));
    this.isBroadcasting = toSignal(this.store.select(selectIsBroadcasting));
    this.recognitionActive = toSignal(this.store.select(recognitionActiveSelector))
    this.showObsStatus = toSignal(this.store.pipe(select(selectObsConnected), map((state) => state !== ObsConnectionState.uninitialized)))

    this.serverError = toSignal(this.store.select(selectPeerError));
    this.serverOffline = toSignal(this.store.select(selectServerOffline));

    this.store.select(platformSelector);
    this.isMobileDevice = toSignal(this.store.pipe(select(platformSelector), map((platform) => platform === AppPlatform.mobile)));
    this.isIncompatibleBrowser = toSignal(this.store.pipe(select(platformSelector), map((platform) => platform === AppPlatform.unsupported)));

    this._injectDashIfRequired();
    effect(() => {
      if (this.acceptedPeerConnections() && !this.socketServerConnected()) {
        this.store.dispatch(PeerActions.connectSocketServer())
      }
    }, { allowSignalWrites: true});

    // Mobile devices cannot broadcast to peers
    this.tabNames = [
      'view',
      'broadcast',
    ];

    if (this.isMobileDevice()) {
      this.tabNames = ['view']
    }

    // The modulus operator here makes sure that the index is always less than the length of the array of tab names
    const initialTabIndex = this.route.snapshot.queryParams['tabIndex'] % this.tabNames.length || 0;
    this.tabsControl = this.fb.control(initialTabIndex)
    this.tabIndex = toSignal(this.tabsControl.valueChanges.pipe(
      takeUntilDestroyed(),
      tap((index) => {
        const params = { tabIndex: index };
        this.router.navigate([], { relativeTo: this.route, queryParams: params, queryParamsHandling: 'merge'})
      }),
      startWith(initialTabIndex)
    )) as Signal<number>;

  }

  ngOnDestroy(): void {
    this.store.dispatch(RecognitionActions.resetState());
  }

  stopWebsocketRecognition(): void {
    this.store.dispatch(ObsActions.disconnect());
    this.store.select(selectObsConnected).pipe(
      filter((state) => state === ObsConnectionState.disconnected),
      take(1)
    ).subscribe(() => this.store.dispatch(RecognitionActions.disconnect({id: 'stream'})))
  }

  @HostListener('window:beforeunload')
  canDeactivate(): boolean | Observable<boolean> {
    const isBusy = this.isBroadcasting();
    console.log('isBusy', isBusy)
    return !isBusy;
  }

  joinSession(): boolean {
    this.joinSessionFormGroup.updateValueAndValidity();
    if (this.joinSessionFormGroup.valid) {
      const id: string = this.joinSessionFormGroup.value.session as string;
      const joinCode: string = this.joinSessionFormGroup.value.joinCode as string;
      this.store.dispatch(PeerActions.setJoinCode({joinCode}));
      this.router.navigate([id], { queryParams: { joinCode }, relativeTo: this.route})
    } else {
      this.joinSessionFormGroup.markAllAsTouched();
    }
    return false;
  }

  private _validateSessionId(control: AbstractControl): ValidationErrors | null {
    if (control.value) {
      const exp = new RegExp(/^([acdefghjkmnpqrstuvwxyz2345679]{2})-([acdefghjkmnpqrstuvwxyz2345679]{4})-([acdefghjkmnpqrstuvwxyz2345679]{4})$/i)
      if (!exp.test(control.value)) {
        return { invalid: true }
      }
    }
    return null;
  }

  private _validateJoinCode(control: AbstractControl): ValidationErrors | null {
    if (control.value) {
      const exp = new RegExp(/^([acdefghjkmnpqrstuvwxyz2345679]{4})$/i)
      if (!exp.test(control.value)) {
        return { invalid: true }
      }
    }
    return null;
  }

  private _injectDashIfRequired(): void {
    const sessionControl: AbstractControl = this.joinSessionFormGroup.controls['session'];
    const dashIndexes = [2, 7]
    sessionControl.valueChanges.pipe(
      takeUntilDestroyed(),
    ).subscribe((value) => {
      for (const i of dashIndexes) {
        if (value && value.length > i) {
          if (value[i] !== '-') {
            sessionControl.setValue(value.slice(0,i) + '-' + value.slice(i, value.length))
          }
        }
      }

    })
  }
}
