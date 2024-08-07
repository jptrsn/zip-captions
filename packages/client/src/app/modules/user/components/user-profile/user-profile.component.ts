import { Component, Signal, WritableSignal, computed, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserActions } from '../../../../actions/user.actions';
import { AppState } from '../../../../models/app.model';
import { UserProfile } from '../../../../reducers/user.reducer';
import { selectUserLoggedIn } from '../../../../selectors/auth.selectors';
import { selectUserProfile } from '../../../../selectors/user.selector';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  public profile: Signal<UserProfile | undefined>;
  public joined: Signal<Date | undefined>;
  public loggedIn: Observable<boolean | undefined>;
  public formGroup: FormGroup;
  public loading: WritableSignal<boolean> = signal(false);
  public accountDeleted: WritableSignal<boolean> = signal(false);
  
  // These must have keys in the USER.PROFILE.DELETE_REASONS translation files
  public reasons: string[] = [
    'alternative',
    'quality',
    'privacy',
    'usage',
    'bugs',
    'other'
  ]

  constructor(private store: Store<AppState>,
              private fb: FormBuilder) {
    this.profile = toSignal(this.store.select(selectUserProfile));
    this.loggedIn = this.store.select(selectUserLoggedIn);
    this.joined = computed(() => {
      const ts = this.profile()?.createdAt;
      if (ts) {
        return new Date(ts)
      }
      return undefined;
    });
    
    this.formGroup = this.fb.group<{email: FormControl<string | null>, reason: FormControl<string | null>}>({
      email: this.fb.control<string | null>('', [(control) => this._validateEmail(control)]),
      reason: this.fb.control<string | null>('')
    });

  }

  // Click handler validates event
  public deleteAccount(): void {
    this.formGroup.updateValueAndValidity();
    if (this.formGroup.valid) {
      this._removeAccount();
    }
  }

  // Fires event and subscribes to appropriate event emitter to render UI
  private _removeAccount(): void {
    this.loading.set(true);
    const reason = this.formGroup.get('reason')?.value
    this.store.dispatch(UserActions.deleteAccount({ reason }));
    const sub = this.loggedIn.subscribe((isLoggedIn: boolean | undefined) => {
      if (!isLoggedIn) {
        this.accountDeleted.set(true);
        this.loading.set(false);
        sub.unsubscribe();
      }
    })
  }

  private _validateEmail(control: AbstractControl): ValidationErrors | null {
    const profile = this.profile();
    if (!profile || !control.value) {
      return { required: true }
    }
    if (control.value !== profile.primaryEmail) {
      return { invalid: true }
    }
    return null;
  }
  
}
