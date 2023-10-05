import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FontFamilyClassMap } from '../../models/settings.model';

@Component({
  selector: 'app-font-family-selector',
  templateUrl: './font-family-selector.component.html',
  styleUrls: ['./font-family-selector.component.scss'],
})
export class FontFamilySelectorComponent {
  @Input({required: true}) group!: FormGroup
  @Input({required: true}) controlName!: string;
  public fontFamilies = FontFamilyClassMap;
}
