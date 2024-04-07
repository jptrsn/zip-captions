import { Component, OnInit, Signal, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../models/app.model';
import { UserRoom } from '../../../../reducers/user.reducer';
import { selectUserLoggedIn } from '../../../../selectors/auth.selectors';
import { selectUserRooms } from '../../../../selectors/user.selector';
import { UserActions } from '../../../../actions/user.actions';

@Component({
  selector: 'app-broadcast-settings',
  templateUrl: './broadcast-settings.component.html',
  styleUrls: ['./broadcast-settings.component.scss'],
})
export class BroadcastSettingsComponent {
  public isLoggedIn: Signal<boolean | undefined>;
  public userRooms: Signal<UserRoom[] | undefined>;
  
  // public isStatic: Signal<boolean | undefined>;
  constructor(private store: Store<AppState>) {
    this.isLoggedIn = toSignal(this.store.select(selectUserLoggedIn));
    this.userRooms = toSignal(this.store.select(selectUserRooms));
    effect(() => {
      if (this.isLoggedIn() && !this.userRooms()) {
        this.store.dispatch(UserActions.getRooms())
      }
    }, { allowSignalWrites: true })
  }
  
}
