import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppTheme } from '../../models/settings.model';

@Component({
  selector: 'app-theme-selector',
  templateUrl: './theme-selector.component.html',
  styleUrls: ['./theme-selector.component.scss'],
})
export class ThemeSelectorComponent {
  @Input() group!: FormGroup;
  @Input() controlName!: string;
  public themes = AppTheme;
}
