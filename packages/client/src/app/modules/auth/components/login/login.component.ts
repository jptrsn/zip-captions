import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../models/app.model';
import { AuthActions } from '../../../../actions/auth.actions';

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
              private store: Store<AppState>) {
    this.formGroup = this.fb.group({
      email: this.fb.control<string>('', [Validators.required, Validators.email]),
      password: this.fb.control<string>('', [Validators.required])
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
}
