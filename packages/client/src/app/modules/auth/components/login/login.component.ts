import { Component, effect } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../models/app.model';
import { AuthActions } from '../../../../actions/auth.actions';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectUserLoggedIn } from 'packages/client/src/app/selectors/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  formGroup: FormGroup<{
    email: FormControl<string | null>, 
    password: FormControl<string | null>
  }>;
  
  constructor(private fb: FormBuilder,
              private store: Store<AppState>,
              private router: Router) {
    this.formGroup = this.fb.group({
      email: this.fb.control<string>('', [Validators.required, Validators.email]),
      password: this.fb.control<string>('', [Validators.required])
    });
    
    const userLoggedIn = toSignal(this.store.select(selectUserLoggedIn));
    effect(() => {
      if (userLoggedIn()) {
        this.router.navigate(['auth', 'user']);
      }
    })
  }

  login(): void {
    this.formGroup.updateValueAndValidity();
    if (this.formGroup.valid) {
      console.log('login', this.formGroup.value);
      const {email, password} = this.formGroup.value as {email: string, password: string};
      this.store.dispatch(AuthActions.login({email, password}));
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  validate(): void {
    this.formGroup.updateValueAndValidity();
    if (this.formGroup.valid) {
      console.log('validate', this.formGroup.value);
      const {email, password} = this.formGroup.value as {email: string, password: string};
      this.store.dispatch(AuthActions.validate({email, password}));
    } else {
      this.formGroup.markAllAsTouched();
    }
  }
}
