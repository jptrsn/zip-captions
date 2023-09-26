import { Component, Input, OnDestroy, OnInit, WritableSignal, signal } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Subject, startWith, takeUntil } from 'rxjs';

@Component({
  selector: 'app-render-history',
  templateUrl: './render-history.component.html',
  styleUrls: ['./render-history.component.scss'],
})
export class RenderHistoryComponent {
  @Input() group!: FormGroup;
  @Input() controlName!: string;
}
