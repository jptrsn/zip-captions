import { Component, Input, OnDestroy, OnInit, WritableSignal, signal } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Subject, startWith, takeUntil } from 'rxjs';

@Component({
  selector: 'app-wake-lock-enabled',
  templateUrl: './wake-lock-enabled.component.html',
  styleUrls: ['./wake-lock-enabled.component.scss'],
})
export class WakeLockEnabledComponent implements OnInit, OnDestroy {
  @Input() group!: FormGroup;
  @Input() controlName!: string;
  public isEnabled: WritableSignal<boolean> = signal(true);

  private onDestroy$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    const ctrl: AbstractControl = this.group.get(this.controlName) as AbstractControl;
    ctrl.valueChanges
    .pipe(
      takeUntil(this.onDestroy$),
      startWith(ctrl.value)
    ).subscribe((value) => this.isEnabled.set(value));
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
