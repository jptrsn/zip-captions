import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-render-history',
  templateUrl: './render-history.component.html',
  styleUrls: ['./render-history.component.scss'],
})
export class RenderHistoryComponent {
  @Input() group!: FormGroup;
  @Input() controlName!: string;
}
