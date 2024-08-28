import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-editable-string',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './editable-string.component.html',
  styleUrls: ['./editable-string.component.scss'],
})
export class EditableStringComponent implements OnInit, OnDestroy {
  @Input({ required: true }) group!: FormGroup;
  @Input({ required: true }) controlName!: string;
  @Input() label?: string;
  @Input() type: 'text' | 'textarea' = 'text';
  control!: FormControl<string | null>
  editMode: Subject<boolean>;
  onDestroy$: Subject<void>;
  constructor() {
    this.editMode = new Subject();
    this.onDestroy$ = new Subject();
  }

  ngOnInit(): void {
    this.control = this.group.get(this.controlName) as FormControl<string | null>;
    console.log('control', this.control);
    if (this.control.updateOn !== 'blur') {
      console.warn(`Using editable string component with form control updateOn '${this.control.updateOn}' is not recommended`)
    }
    this.editMode.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe((editable) => {
      if (editable) {
        // this.control.enable();
      } else {
        // this.control.disable();
      }
    })
    this.editMode.next(false);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
