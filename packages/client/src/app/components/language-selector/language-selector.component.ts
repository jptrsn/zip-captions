import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Language } from '../../models/app.model';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
})
export class LanguageSelectorComponent {
  @Input() group!: FormGroup
  @Input() controlName!: string;
  public languages = Language;
}
