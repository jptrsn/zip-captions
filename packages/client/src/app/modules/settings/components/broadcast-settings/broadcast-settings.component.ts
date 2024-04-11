import { Component, OnInit, Signal, computed } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { Observable, filter, take } from 'rxjs';
import { UserActions } from '../../../../actions/user.actions';
import { AppState } from '../../../../models/app.model';
import { UserRoom } from '../../../../reducers/user.reducer';
import { selectUserLoggedIn } from '../../../../selectors/auth.selectors';
import { selectUserId, selectUserRooms } from '../../../../selectors/user.selector';

@Component({
  selector: 'app-broadcast-settings',
  templateUrl: './broadcast-settings.component.html',
  styleUrls: ['./broadcast-settings.component.scss'],
})
export class BroadcastSettingsComponent implements OnInit {
  public isLoggedIn: Signal<boolean | undefined>;

  public canAddRooms: Signal<boolean>;
  public userRooms: Signal<UserRoom[] | undefined>;
  private userId$: Observable<string | undefined>;
  constructor(private store: Store<AppState>) {
    this.isLoggedIn = toSignal(this.store.select(selectUserLoggedIn));
    this.userRooms = toSignal(this.store.select(selectUserRooms));
    this.canAddRooms = computed(() => {
      if (this.userRooms()) {
        return !this.userRooms()?.some((room) => room.isStatic);
      }
      return true;
    })
    this.userId$ = this.store.select(selectUserId).pipe(takeUntilDestroyed());
  }

  ngOnInit(): void {
    if (this.isLoggedIn()) {
      this.store.dispatch(UserActions.getRooms())
    } else {
      this.userId$.pipe(
        filter((id) => !!id),
        take(1)
      ).subscribe(() => this.store.dispatch(UserActions.getRooms()))
    }
  }

  stringToDate(dateStr: string | undefined): Date | undefined {
    return dateStr ? new Date(dateStr) : undefined;
  }
  
}
