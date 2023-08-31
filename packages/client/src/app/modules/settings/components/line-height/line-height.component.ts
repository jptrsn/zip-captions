import { Component, Input, OnDestroy, OnInit, WritableSignal, signal } from '@angular/core';
import { AvailableLineHeights } from '../../models/settings.model';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Subject, takeUntil, startWith } from 'rxjs';

@Component({
  selector: 'app-line-height',
  templateUrl: './line-height.component.html',
  styleUrls: ['./line-height.component.scss'],
})
export class LineHeightComponent implements OnInit, OnDestroy {
  @Input() group!: FormGroup;
  @Input() controlName!: string;
  public availableHeights = AvailableLineHeights;
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
