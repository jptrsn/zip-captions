import { Component, Signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../models/app.model';
import { UserProfile } from '../../../../reducers/user.reducer';
import { selectUserProfile } from '../../../../selectors/user.selector';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  public profile: Signal<UserProfile | undefined>;
  public joined: Signal<Date | undefined>;
  public showForm = false;
  constructor(private store: Store<AppState>,
              private fb: FormBuilder) {
    this.profile = toSignal(this.store.select(selectUserProfile));
    this.joined = computed(() => {
      const ts = this.profile()?.createdAt;
      if (ts) {
        return new Date(ts)
      }
      return undefined;
    });

  }
  
}
