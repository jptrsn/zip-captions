import { Component, Input, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Subject, takeUntil, startWith } from 'rxjs';

@Component({
  selector: 'app-transcript-enabled',
  templateUrl: './transcript-enabled.component.html',
  styleUrls: ['./transcript-enabled.component.scss'],
})
export class TranscriptEnabledComponent implements OnInit, OnDestroy {
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
