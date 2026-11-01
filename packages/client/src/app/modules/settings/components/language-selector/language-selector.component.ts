import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AvailableLanguages } from '../../models/settings.model';


@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
	standalone: false
})
export class LanguageSelectorComponent {
  @Input() group!: FormGroup
  @Input() controlName!: string;
  @Input() label = 'LABELS.spokenLanguage';
  @Input() testId = 'zc-appearance-lang';
  /** Adds a first option that follows the spoken language (value 'spoken') */
  @Input() includeSameAsSpoken = false;
  public languages = AvailableLanguages;
}
