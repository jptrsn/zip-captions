import { Component, Input, OnDestroy, OnInit, WritableSignal, signal } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Subject, takeUntil, startWith } from 'rxjs';
import { AvailableTextSizes } from '../../models/settings.model';

@Component({
  selector: 'app-text-size',
  templateUrl: './text-size.component.html',
  styleUrls: ['./text-size.component.scss'],
})
export class TextSizeComponent implements OnInit, OnDestroy {
  @Input() group!: FormGroup;
  @Input() controlName!: string;
  public availableTextSizes = AvailableTextSizes;
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
