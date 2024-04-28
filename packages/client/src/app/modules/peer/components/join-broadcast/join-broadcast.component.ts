import { Component, Input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-join-broadcast',
  templateUrl: './join-broadcast.component.html',
  styleUrls: ['./join-broadcast.component.scss'],
})
export class JoinBroadcastComponent {
  @Input() disabled!: boolean;
  public joinSessionFormGroup = this.fb.group({
    room: this.fb.control<string>('', [Validators.required, (ctrl) => this._validateSessionId(ctrl)]),
  });

  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) {
    this._injectDashIfRequired();
  }

  joinSession(): boolean {
    this.joinSessionFormGroup.updateValueAndValidity();
    if (this.joinSessionFormGroup.valid) {
      const id: string = this.joinSessionFormGroup.value.room as string;
      this.router.navigate([id], { relativeTo: this.route})
    } else {
      this.joinSessionFormGroup.markAllAsTouched();
    }
    return false;
  }

  private _validateSessionId(control: AbstractControl): ValidationErrors | null {
    if (control.value) {
      const exp = new RegExp(/^([acdefghjkmnpqrstuvwxyz2345679]{2})-([acdefghjkmnpqrstuvwxyz2345679]{4})-([acdefghjkmnpqrstuvwxyz2345679]{4})$/i)
      if (!exp.test(control.value)) {
        return { invalid: true }
      }
    }
    return null;
  }

  private _injectDashIfRequired(): void {
    const sessionControl: AbstractControl = this.joinSessionFormGroup.controls['room'];
    const dashIndexes = [2, 7]
    sessionControl.valueChanges.pipe(
      takeUntilDestroyed(),
    ).subscribe((value) => {
      for (const i of dashIndexes) {
        if (value && value.length > i) {
          if (value[i] !== '-') {
            sessionControl.setValue(value.slice(0,i) + '-' + value.slice(i, value.length))
          }
        }
      }
      
    })
  }

}
