import { Component, Signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../models/app.model';
import { UserMetadata, UserProfile } from '../../../../reducers/user.reducer';
import { selectUserMetadata, selectUserProfile } from '../../../../selectors/user.selector';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  public profile: Signal<UserProfile | undefined>;
  public joined: Signal<Date | undefined>;
  public meta: Signal<UserMetadata | undefined>;
  public formGroup: FormGroup;
  public showForm = false;
  constructor(private store: Store<AppState>,
              private fb: FormBuilder) {
    this.profile = toSignal(this.store.select(selectUserProfile));
    this.meta = toSignal(this.store.select(selectUserMetadata));
    this.joined = computed(() => {
      const ts = this.profile()?.createdAt;
      if (ts) {
        return new Date(ts)
      }
      return undefined;
    });

    this.formGroup = this.fb.group({
      roomId: this.fb.control({value: this.meta()?.roomId, disabled: true}, [Validators.required]),
      joinCode: this.fb.control({value: this.meta()?.joinCode, disabled: true}, [Validators.required])
    });
  }

  refreshSessionId(): void {
    console.log('refreshSessionId')
  }

  refreshJoinCode(): void {
    console.log('refreshJoinCode')
  }

  saveForm(): void {
    console.log('saveForm')
  }
  
}
