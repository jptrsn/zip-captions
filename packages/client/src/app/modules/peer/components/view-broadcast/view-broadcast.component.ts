import { Component, HostListener, OnDestroy, Signal, WritableSignal, computed, effect, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subject, filter, interval, map, take, takeWhile, tap } from 'rxjs';
import { PeerActions } from '../../../../actions/peer.actions';
import { ComponentCanDeactivate } from '../../../../guards/active-stream/active-stream.guard';
import { AppActions, AppState } from '../../../../models/app.model';
import { selectBroadcastEndedTimestamp, selectHostOnline, selectIsViewing, selectJoinCode, selectPeerError, selectPeerServerConnected, selectSocketServerConnected } from '../../../../selectors/peer.selectors';

@Component({
  selector: 'app-view-broadcast',
  templateUrl: './view-broadcast.component.html',
  styleUrls: ['./view-broadcast.component.scss'],
})
export class ViewBroadcastComponent implements ComponentCanDeactivate, OnDestroy {
  @HostListener('window:beforeunload')
  public joinCode: Signal<string | undefined>;
  public isViewing: Signal<boolean | undefined>;
  public formGroup: FormGroup;
  public hostOnline: Signal<boolean | undefined>;
  public verifyJoinCodeTimer?: Observable<number>;
  public showLeaveBroadcastDialog: WritableSignal<boolean> = signal(false);
  public dialogClosedSubject: Subject<boolean> = new Subject<boolean>();
  public connected: Signal<boolean | undefined>;
  public serverError: Signal<string | undefined>;
  public broadcastEndedTimestamp: Signal<number | undefined>;

  public readonly HOST_ONLINE_TIMEOUT_SECONDS = 30;

  private roomId: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private store: Store<AppState>) {
    this.roomId = this.route.snapshot.params['id'].toLowerCase();
    this.joinCode = toSignal(this.store.select(selectJoinCode));
    this.isViewing = toSignal(this.store.select(selectIsViewing));
    this.hostOnline = toSignal(this.store.select(selectHostOnline));
    this.serverError = toSignal(this.store.select(selectPeerError));
    this.broadcastEndedTimestamp = toSignal(this.store.select(selectBroadcastEndedTimestamp));
    
    const socketConnected: Signal<boolean | undefined> = toSignal(this.store.select(selectSocketServerConnected));
    const peerConnected: Signal<boolean | undefined> = toSignal(this.store.select(selectPeerServerConnected));
    this.connected = computed(() => socketConnected() && peerConnected())
    
    this.formGroup = this.fb.group({
      joinCode: this.fb.control<string>('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)])
    })

    if ('joinCode' in this.route.snapshot.queryParams && this.route.snapshot.queryParams['joinCode'] !== this.joinCode()) {
      this._updateJoinCodeAndConnect(this.route.snapshot.queryParams['joinCode'].toLowerCase());
    } else {
      this._joinRoom();
    }

    effect(() => {
      if (this.isViewing()) {
        this.store.dispatch(AppActions.hideFooter())
      } else {
        this.store.dispatch(AppActions.showFooter())
      }
    }, {allowSignalWrites: true})
  }

  canDeactivate(): boolean | Observable<boolean> {
    if (this.isViewing() && this.hostOnline()) {
      this.showLeaveBroadcastDialog.set(true);
      return this.dialogClosedSubject.asObservable().pipe(
        take(1),
        tap(() => this.showLeaveBroadcastDialog.set(false))
      )
    }
    return true;
  }

  ngOnDestroy(): void {
    if (this.isViewing()) {
      this.store.dispatch(PeerActions.leaveBroadcastRoom());
    }
    this.store.dispatch(AppActions.showFooter());
  }

  rejoin(): void {
    this.formGroup.updateValueAndValidity();
    if (this.formGroup.valid) {
      const newCode = this.formGroup.value.joinCode;
      this._updateQueryParamsCode(newCode);
      this._updateJoinCodeAndConnect(newCode);
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  leaveSessionDialogClosed(confirmed: boolean): void {
    this.dialogClosedSubject.next(confirmed);
  }

  private _updateQueryParamsCode(joinCode: string): void {
    this.router.navigate([], { relativeTo: this.route, queryParams: { joinCode }, queryParamsHandling: 'merge'})
  }

  private _joinRoom(): void {
    if (!this.connected()) {
      this.store.pipe(
        select(selectPeerServerConnected),
        filter((connected) => !!connected),
        take(1),
      ).subscribe(() => {
        this.store.dispatch(PeerActions.joinBroadcastRoom({id: this.roomId }))
      })
      this.store.dispatch(PeerActions.connectSocketServer())
    } else {
      this.store.dispatch(PeerActions.joinBroadcastRoom({id: this.roomId }))
    }
    
    this.verifyJoinCodeTimer = interval(1000).pipe(
      takeWhile((value) => (value < this.HOST_ONLINE_TIMEOUT_SECONDS && this.hostOnline() === undefined)),
      map((value) => value + 1)
    );
  }

  private _updateJoinCodeAndConnect(updatedJoinCode: string): void {
    this.store.dispatch(PeerActions.setJoinCode({joinCode: updatedJoinCode}));
    this.store.select(selectJoinCode).pipe(
      filter((code) => (code === updatedJoinCode)),
      take(1)
    ).subscribe(() => {
      this._joinRoom();
    });
  }
}
