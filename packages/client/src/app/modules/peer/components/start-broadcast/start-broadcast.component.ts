import { AfterViewInit, Component, effect, Input, OnChanges, Signal, SimpleChanges } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Observable, take } from 'rxjs';
import { PeerActions } from '../../../../actions/peer.actions';
import { AppState } from '../../../../models/app.model';
import { UserRoom } from '../../../../reducers/user.reducer';
import { selectUserLoggedIn } from '../../../../selectors/auth.selectors';
import { selectMyBroadcastRooms } from '../../../../selectors/peer.selectors';
import { selectUserId } from '../../../../selectors/user.selector';

@Component({
  selector: 'app-start-broadcast',
  templateUrl: './start-broadcast.component.html',
  styleUrls: ['./start-broadcast.component.scss'],
})
export class StartBroadcastComponent implements AfterViewInit, OnChanges {
  @Input() acceptedPeerConnections!: Signal<boolean | undefined>;
  @Input() isMobileDevice!: Signal<boolean | undefined>;
  @Input() isIncompatibleBrowser!: Signal<boolean | undefined>;
  @Input() disabled!: boolean;

  public formGroup: FormGroup;
  public userRooms: Signal<UserRoom[] | undefined>;

  public isLoggedIn: Signal<boolean | undefined>;
  private userId$: Observable<string | undefined>;
  private broadcastRooms$: Observable<UserRoom[] | undefined>;
  
  constructor(private store: Store<AppState>,
              private fb: FormBuilder,
              private route: ActivatedRoute) {
    this.broadcastRooms$ = this.store.select(selectMyBroadcastRooms);
    this.userRooms = toSignal(this.broadcastRooms$);
    this.formGroup = this.fb.group({
      room: this.fb.control<string | null>(null),
      useAuthentication: this.fb.control<boolean>(true, [Validators.required])
    });
    this.userId$ = this.store.select(selectUserId).pipe(takeUntilDestroyed());
    this.isLoggedIn = toSignal(this.store.select(selectUserLoggedIn));

    if (this.isLoggedIn()) {
      this._listUserRooms();
    } else {
      this.userId$.pipe(
        filter((id) => !!id),
        take(1)
      ).subscribe(() => this._listUserRooms());
    }

    effect(() => {
      console.log('isLoggedIn', this.isLoggedIn())
    })

    this.formGroup.controls['room'].valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((roomId) => {
        if (roomId) {
          const id = roomId.toLowerCase()
          const room = this.userRooms()?.find((room) => room.roomId.toLowerCase() === id)
          if (room) {
            this.formGroup.controls['useAuthentication'].setValue(!room.allowAnonymous)
          }
        }
      })
  }

  /**
   * The server sends the whole list again on every refresh, as new objects. Without a key per room the options
   * are rebuilt each time, and the select forgets which one is chosen while the form still holds it.
   */
  public trackRoom(_index: number, room: UserRoom): string {
    return room.roomId;
  }

  ngAfterViewInit(): void {
    // The first list can be empty (nothing has come back from the server yet), so wait for one with rooms in it;
    // taking the first list of any kind left the room unselected, and a room the user picks meanwhile is theirs
    this.broadcastRooms$.pipe(
      filter((rooms) => !!rooms && rooms.length > 0),
      take(1))
    .subscribe((rooms) => {
      if (this.formGroup.controls['room'].dirty) return;
      // A room chosen in the settings (its Start Broadcast button) wins over the default static room
      const requested = this.route.snapshot.queryParams['room']?.toLowerCase();
      const chosen = (requested && rooms?.find((r: UserRoom) => r.roomId.toLowerCase() === requested))
        || rooms?.find((r: UserRoom) => r.isStatic);
      if (chosen) {
        this.formGroup.controls['room'].setValue(chosen.roomId);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['disabled']) {
      if (changes['disabled'].currentValue === false) {
        this.formGroup.enable();
      } else if (changes['disabled'].currentValue && !this.formGroup.disabled) {
        this.formGroup.disable();
      }
    }
  }

  createRoom() {
    const request: { allowAnonymous: boolean, myBroadcast?: boolean, roomId?: string } = {
      myBroadcast: true,
      allowAnonymous: !this.formGroup.controls['useAuthentication'].value,
    }
    if (this.formGroup.controls['room'].value) {
      request.roomId = this.formGroup.controls['room'].value;
    }
    this.store.dispatch(PeerActions.createBroadcastRoom(request));
  }

  private _listUserRooms(): void {
    console.log('list users rooms')
    this.store.dispatch(PeerActions.getBroadcastRooms())
  }
}
