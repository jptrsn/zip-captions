import { AfterViewInit, Component, Input, OnDestroy, WritableSignal, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-wake-lock-enabled',
  templateUrl: './wake-lock-enabled.component.html',
  styleUrls: ['./wake-lock-enabled.component.scss'],
})
export class WakeLockEnabledComponent implements AfterViewInit, OnDestroy {
  @Input() group!: FormGroup;
  @Input() controlName!: string;
  public isEnabled: WritableSignal<boolean> = signal(true);

  private onDestroy$: Subject<void> = new Subject<void>();

  ngAfterViewInit(): void {
    this.group.get(this.controlName)?.valueChanges
    .pipe(takeUntil(this.onDestroy$))
    .subscribe((value) => this.isEnabled.set(value));
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
