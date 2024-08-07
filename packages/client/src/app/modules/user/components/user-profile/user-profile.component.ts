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
    
    this.formGroup = this.fb.group<{email: FormControl<string | null> }>({
      email: this.fb.control<string | null>('', [(control) => this._validateEmail(control)])
    });

  }

  // Click handler validates event
  public deleteAccount(): void {
    this.formGroup.updateValueAndValidity();
    const email = this.profile()?.primaryEmail
    if (this.formGroup.valid && email) {
      this._removeAccount(email);
    }
  }

  // Fires event and subscribes to appropriate event emitter to render UI
  private _removeAccount(email: string): void {
    this.loading.set(true);
    this.store.dispatch(UserActions.deleteAccount({ email }));
    this.loggedIn.subscribe((isLoggedIn: boolean | undefined) => {
      console.log('is logged in', isLoggedIn);
      if (!isLoggedIn) {
        this.accountDeleted.set(true);
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
