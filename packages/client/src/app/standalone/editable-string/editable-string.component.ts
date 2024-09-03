import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

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
export class EditableStringComponent implements OnInit {
  @Input({ required: true }) group!: FormGroup;
  @Input({ required: true }) controlName!: string;
  @Input() label?: string;
  @Input() placeholder = '';
  @Input() type: 'text' | 'textarea' = 'text';
  @Input() classList = '';
  control!: FormControl<string | null>

  ngOnInit(): void {
    this.control = this.group.get(this.controlName) as FormControl<string | null>;
    if (this.control.updateOn !== 'blur') {
      console.warn(`Using editable string component with form control updateOn '${this.control.updateOn}' is not recommended`)
    }
  }
  
}
