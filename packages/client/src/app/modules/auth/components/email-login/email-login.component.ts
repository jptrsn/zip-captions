import { Component, Signal, WritableSignal, computed, effect, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../../../actions/auth.actions';
import { AppState } from '../../../../models/app.model';
import { selectAuthError, selectUserLoggedIn } from '../../../../selectors/auth.selectors';

@Component({
  selector: 'app-email-login',
  templateUrl: './email-login.component.html',
  styleUrls: ['./email-login.component.scss'],
})
export class EmailLoginComponent {
  public formGroup: FormGroup<{
    email: FormControl<string | null>, 
    password: FormControl<string | null>
  }>;

  public isSignUp: WritableSignal<boolean> = signal(false);
  public error: Signal<string | undefined>;
  
  constructor(private fb: FormBuilder,
              private store: Store<AppState>,
              private router: Router) {
    this.formGroup = this.fb.group({
      email: this.fb.control<string>('', [Validators.required, Validators.email]),
      password: this.fb.control<string>('', [Validators.required])
    });

    const authError = toSignal(this.store.select(selectAuthError));
    this.error = computed(() => {
      const errMessage = authError();
      const loginErrExp = new RegExp(/(404)|(401)/)
      const badRequestExp = new RegExp(/(400)/);
      if (errMessage) {
        if (loginErrExp.test(errMessage)) {
          return 'User not found or incorrect password';
        }
        if (badRequestExp.test(errMessage)) {
          if (this.isSignUp()) {
            return 'Failed to create user, do you already have an account?';
          }
          return 'Bad request';
        }
        return errMessage;
      }
      return undefined;
    })
    
    const userLoggedIn = toSignal(this.store.select(selectUserLoggedIn));
    effect(() => {
      if (userLoggedIn()) {
        this.router.navigate(['auth', 'user']);
      }
    });
  }

  submit(): void {
    if (this.isSignUp()) {
      this.signup();
    } else {
      this.login();
    }
  }

  signup(): void {
    this.formGroup.updateValueAndValidity();
    if (this.formGroup.valid) {
      const {email, password} = this.formGroup.value as {email: string, password: string};
      this.store.dispatch(AuthActions.signUp({email, password}));
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  login(): void {
    this.formGroup.updateValueAndValidity();
    if (this.formGroup.valid) {
      const {email, password} = this.formGroup.value as {email: string, password: string};
      this.store.dispatch(AuthActions.login({email, password}));
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  validate(): void {
    this.formGroup.updateValueAndValidity();
    if (this.formGroup.valid) {
      const {email, password} = this.formGroup.value as {email: string, password: string};
      this.store.dispatch(AuthActions.validate({email, password}));
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  toggleSignup(): void {
    this.isSignUp.set(!this.isSignUp())
    this.store.dispatch(AuthActions.clearError());
  }
}
