import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
  
  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      email: this.fb.control<string>('', [Validators.required, Validators.email]),
      password: this.fb.control<string>('', [Validators.required])
    })
  }

  login(): void {
    this.formGroup.updateValueAndValidity();
    if (this.formGroup.valid) {
      console.log('login', this.formGroup.value);
    } else {
      this.formGroup.markAllAsTouched();
    }
  }
}
