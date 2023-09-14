import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-connect-obs',
  templateUrl: './connect-obs.component.html',
  styleUrls: ['./connect-obs.component.scss'],
})
export class ConnectObsComponent {
  public formGroup: FormGroup;
  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      websocket: this.fb.control<string>('', [Validators.required])
    })
  }

  public saveObsWebsocket(): void {
    this.formGroup.updateValueAndValidity();
    if (this.formGroup.valid) {
      console.log('saveObsWebsocket', this.formGroup.value)
    } else {
      this.formGroup.markAsTouched();
    }
  }
}
