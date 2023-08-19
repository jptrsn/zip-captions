import { Component, OnDestroy, Signal, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, filter, map, take } from 'rxjs';
import { PeerActions } from '../../../../actions/peer.actions';
import { AppActions, AppState } from '../../../../models/app.model';
import { selectIsViewing, selectJoinCode, selectPeerServerConnected } from '../../../../selectors/peer.selectors';
import { ComponentCanDeactivate } from '../../../../guards/active-stream/active-stream.guard';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-broadcast',
  templateUrl: './view-broadcast.component.html',
  styleUrls: ['./view-broadcast.component.scss'],
})
export class ViewBroadcastComponent implements ComponentCanDeactivate, OnDestroy {
  public joinCode: Signal<string | undefined>;
  public isViewing: Signal<boolean | undefined>;
  public formGroup: FormGroup;
  private roomId: string;
  private connected: Signal<boolean | undefined>;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private store: Store<AppState>) {
    this.roomId = this.route.snapshot.params['id'].toLowerCase();
    this.connected = toSignal(this.store.select(selectPeerServerConnected));
    this.joinCode = toSignal(this.store.select(selectJoinCode));
    this.isViewing = toSignal(this.store.select(selectIsViewing));

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
    if (this.isViewing()) {
      this.store.dispatch(PeerActions.leaveBroadcastRoom());
      return this.store.select(selectIsViewing).pipe(
        filter((val) => !!val),
        map((val) => !!val)
      )
    }
    return true;
  }

  ngOnDestroy(): void {
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
