import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profanity-filter-toggle',
  templateUrl: './profanity-filter-toggle.component.html',
  styleUrls: ['./profanity-filter-toggle.component.scss'],
})
export class ProfanityFilterToggleComponent {
  @Input() group!: FormGroup;
  @Input() controlName!: string;
}
